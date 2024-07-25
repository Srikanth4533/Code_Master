const passport = require("passport");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  CALL_BACK,
} = require("../config/serverConfig");
const Strategy = require("passport-google-oauth20").Strategy;

const passportConfig = passport.use(
  new Strategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALL_BACK,
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passportConfig;
