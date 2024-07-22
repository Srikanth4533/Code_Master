const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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

const User = mongoose.model("users", userSchema);

module.exports = User;
