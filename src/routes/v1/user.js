const express = require("express");

const { register } = require("../../controllers/user-controller");

const router = express.Router();

router.post("/register", register);

router.post("/sri", (req, res) => {
  console.log("srikanth");
  console.log(req.body);
  res.json({
    success: true,
  });
});

module.exports = router;
