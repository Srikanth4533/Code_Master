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
}

module.exports = UserService;
