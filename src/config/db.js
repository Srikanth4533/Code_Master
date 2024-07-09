const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/code_master");
    console.log(`Successfully connected to MongoDB Atlas.....`);
  } catch (error) {
    console.log("Error in connecting to MongoDB Atlas.", error.message);
  }
};

module.exports = {
  connectDB,
};
