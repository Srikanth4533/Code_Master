const express = require("express");
const userRoutes = require("./v1/user");

const router = express.Router();

router.use("/v1", userRoutes);

module.exports = router;
