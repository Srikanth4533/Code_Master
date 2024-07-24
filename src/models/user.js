const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    minlength: [4, "Name should have atleast 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email ID"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  mobileNumber: {
    type: String,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: "Mobile number must be a 10-digit number.",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "employee"],
    default: "user",
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  dob: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
});

userSchema.methods.getJWTToken = async function () {
  const token = jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY * 24 * 60 * 60 * 1000,
  });

  return token;
};

userSchema.methods.comparePassword = function (password) {
  const match = bcrypt.compareSync(password, this.password);

  return match;
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
