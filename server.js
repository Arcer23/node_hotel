const express = require("express"); // we can use node instead but express makes us easier
const app = express(); //creating a app server
const db = require("./db");
const bodyParser = require("body-parser"); //
app.use(bodyParser.json()); // req body
require("dotenv").config(); // now the server knows that we are using all the configuration files using dotenv

//import routes from the person routes

const personRoutes = require("./routes/personRoutes");
const foodroutes = require("./routes/food");

app.use("/person", personRoutes); 
app.use("/menu", foodroutes);


const PORT = process.env.PORT || 3000; // if in process.env.PORT there is port value that it uses the current value otherwise it will use the another value
app.listen( PORT, () => {
  console.log("server is currently runnning");
});

//this is for the testing purpose
