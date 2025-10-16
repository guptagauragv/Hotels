const mongoose = require("mongoose");

// Define MongoDB connection URL
//const mongoURL = "mongodb://localhost:27017/hotels"; // replace database with your database name
const mongoURL =
  "mongodb+srv://guptagauragv:Qwerty@12345@cluster0.lntqoao.mongodb.net/"; // global host
// setup mongoDB connection0

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
