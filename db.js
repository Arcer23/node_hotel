const mongoose = require("mongoose");
//definfing the mongodb connection URL
const link = "mongodb://127.0.0.1:27017/details";

//setting up mongodb connection
mongoose.connect(link);

//get the defualt connection
//Mongoose maintains a default connection object representing the mongodb connection
const db = mongoose.connection;

//defining event listeners for database connection
db.on("connected", () => {
  console.log("connected to mongodb");
});

db.on("error", (err) => {
  console.error("error");
});

db.on("disconnected", () => {
  console.log("disconnected");
});

//exporting the database connection
//it is representing the mongodb connection to the node js server

module.exports = db;
