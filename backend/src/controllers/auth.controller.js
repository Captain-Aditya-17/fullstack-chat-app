const userServices = require("../services/user.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const cloudinary = require("../lib/cloudinary")

module.exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, fullname } = req.body;

  const user = await userServices.createUser(email, fullname, password);
  const token = await user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({ user, token });
};

module.exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = await user.generateAuthToken();
  

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "Lax", 
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  res.json({ user, token });
};

module.exports.logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    res.json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


module.exports.updateProfile = async(req,res)=>{
  try {
    const {profilePic} = req.body    
    const userId = req.user._id

    if(!profilePic){
      return res.status(400).json({msg:"Please provide a profile picture"})
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updateUser = await userModel.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, {new: true})

    res.status(200).json(updateUser)

  } catch (error) {
    console.error("update Error:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports.checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Check Auth Error:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}