const mongoose = require("mongoose");
require("dotenv").config();
//definfing the mongodb connection URL
// const link = "mongodb://127.0.0.1:27017/details";
//setting up mongodb connection
// const mongo_url = 'mongodb+srv://pranishkadel1:pranishisgood@cluster0.04wh6.mongodb.net/'
const mongo_url = process.env.DB_URL;
mongoose.connect(mongo_url);
//get the defualt connection
//Mongoose maintains a default connection object representing the mongodb connection
// const mongo_url = process.env.DB_URL_LOCAL;
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
