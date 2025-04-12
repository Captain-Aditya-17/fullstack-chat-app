const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    fullname: this.fullname,
    profilePic: this.profilePic,
    // Add more if needed
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("user", userSchema);
