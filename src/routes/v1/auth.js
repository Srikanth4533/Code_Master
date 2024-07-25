const express = require("express");
const passport = require("passport");
const {
  googleLogInSuccess,
  googleLogInFailure,
  googleAuthCallBack,
  googleLogOut,
} = require("../../controllers/auth-controller");

const router = express.Router();

// Google SSO
router.get("/login/success", googleLogInSuccess);
router.get("/login/failure", googleLogInFailure);
router.get(
  "/auth/google",
  passport.authenticate("google", ["profile", "email"])
);
router.get("/auth/google/callback", googleAuthCallBack);

router.get("/logout", googleLogOut);

module.exports = router;
