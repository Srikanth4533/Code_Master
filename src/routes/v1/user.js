const express = require("express");

const {
  register,
  forgotPassword,
  resetPassword,
} = require("../../controllers/user-controller");

const router = express.Router();

router.post("/users/register", register);
router.post("/users/forgotPassword", forgotPassword);
router.patch("/users/forgotPassword/:token", resetPassword);

router.post("/sri", (req, res) => {
  console.log("srikanth");
  console.log(req.body);
  res.json({
    success: true,
  });
});

module.exports = router;
