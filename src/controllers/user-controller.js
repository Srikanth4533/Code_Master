const UserService = require("../services/user-service");

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

module.exports = {
  register,
};
