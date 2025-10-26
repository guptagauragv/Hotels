const mongoose = require("mongoose");
require('dotenv').config();

// Define MongoDB connection URL
const mongoURL =
  "mongodb+srv://guptagaurav2007:Qwerty67890@cluster0.lntqoao.mongodb.net/test";
//const mongoURL = "mongodb://localhost:27017/hotels"; // replace database with your database name
// setup mongoDB connection

mongoose.connect(mongoURL);

// Get the default connection
// mongoose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

// Define event listener for database connection

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export Database Connection

module.exports = db;
