import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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
      default: '',
    },
  },
  { timestamps: true }
);

// Instance method
userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    fullname: this.fullname,
    profilePic: this.profilePic,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Static method
userSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('user', userSchema);

export default User;
