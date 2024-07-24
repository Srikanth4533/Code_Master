const crypto = require("crypto");
const UserService = require("../services/user-service");
const sendEmail = require("../utils/email");

const userService = new UserService();

const register = async (req, res) => {
  try {
    const { username, email, password, mobilenumber, role, gender } = req.body;
    const user = await userService.register({
      username,
      email,
      password,
      mobilenumber,
      role,
      gender,
    });
    return res.status(200).json({
      success: true,
      message: "User Registration Successfull",
      data: user,
      err: {},
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong in registering user",
      data: {},
      err: error,
    });
  }
};

const forgotPassword = async (req, res) => {
  // GET USER BASED ON POSTED EMAIL
  const user = await userService.findByEmail(req.body.email);

  if (!user) {
    return res.status(400).json({
      success: false,
      msg: "We could not find user with given email",
    });
  }

  // GENERATE A RANDOM RESET TOKEN
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // SEND THE TOKEN BACK TO THE USER EMAIL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;
  const message = `We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nThis reset password link only valid for 10 minutes`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request received",
      message: message,
    });
    res.status(200).json({
      success: true,
      msg: "Password reset link send to the user email successfully..",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      msg: "There was an error sending password reset email: Please try again later",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await userService.findByPasswordToken(token);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Token is invalid or expired",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save();

    // Login The User
    const loginToken = await user.getJWTToken(user._id);
    return res.status(200).json({
      success: true,
      message: "Password reset successful",
      data: loginToken,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "error in passsword rest",
    });
  }
};

module.exports = {
  register,
  forgotPassword,
  resetPassword,
};
