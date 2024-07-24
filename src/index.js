const express = require("express");
const bodyParser = require("body-parser");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const cookieSession = require("cookie-session");

const {
  PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("./config/serverConfig");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/v1/auth");

const apiRoutes = require("./routes/index");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["harvestly"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// DB Connection
connectDB();

// process.on("uncaughtException", (err) => {
//   console.log(`Error Name: ${err.name} Error: ${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);

//   process.exit(1);
// });

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
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

app.use(passport.initialize());
app.use(passport.session());

const setupAndStart = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // app.use("/", authRoutes);

  function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }

  app.get("/", (req, res) => {
    res.send('<a href="/google">Authenticate with Google</a>');
  });

  app.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/protected",
      failureRedirect: "/auth/google/failure",
    })
  );

  app.get("/auth/google/failure", (req, res) => {
    return res.status(401).json({
      success: false,
      message: "Login Failure",
    });
  });

  app.get("/auth/google/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.send("Good bye...");
  });

  app.get("/protected", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(`${req.user.displayName}`);
  });
  app.use("/api", apiRoutes);

  const server = app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`);
  });

  // process.on("unhandledRejection", (err) => {
  //   console.log(`Error Name: ${err.name} Error: ${err.message}`);
  //   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  //   server.close(() => {
  //     process.exit(1);
  //   });
  // });
};

setupAndStart();
