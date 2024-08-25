const express = require("express"); // we can use node instead but express makes us easier
const app = express(); //creating a app server
const db = require("./db");
const bodyParser = require("body-parser"); //
app.use(bodyParser.json()); // req body

//import routes from the person routes

const personRoutes = require("./routes/personRoutes");
const foodroutes = require("./routes/food");

app.use("/person", personRoutes); 
app.use("/menu", foodroutes);
app.listen(3000, () => {
  console.log("server is currently runnning");
});
