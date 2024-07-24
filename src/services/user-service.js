const User = require("../models/user");

class UserService {
  async register(data) {
    try {
      const response = await User.create(data);
      return response;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const response = await User.findOne({ email: email });
      return response;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }

  async findByPasswordToken(passwordResetToken) {
    try {
      const response = await User.findOne({
        resetPasswordToken: passwordResetToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      return response;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }
}

module.exports = UserService;
