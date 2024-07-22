const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const { connectDB } = require("./config/db");

const apiRoutes = require("./routes/index");

const app = express();

// DB Connection
connectDB();

// process.on("uncaughtException", (err) => {
//   console.log(`Error Name: ${err.name} Error: ${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);

//   process.exit(1);
// });

const setupAndStart = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

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
