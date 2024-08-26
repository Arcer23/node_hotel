const express = require("express"); // we can use node instead but express makes us easier
const app = express(); //creating a app server
const Person = require("./models/person");
const db = require("./db");
const bodyParser = require("body-parser"); //
app.use(bodyParser.json()); // re//import routes from the person routesq body
require("dotenv").config(); // now the server knows that we are using all the configuration files using dotenv
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//middleware function
const logrequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // tihs is saying that move to another operation
};
app.use(logrequest);

//using passport

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    //authentication process will be done here
    try {
      console.log("Received Credentials : ", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const isPasswordMatch = user.comparepassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

//initializing the passport

app.use(passport.initialize());

const LocalAuthMiddleware = passport.authenticate("local", {session:false});

//import routes from the person routes
const personRoutes = require("./routes/personRoutes");
const foodroutes = require("./routes/food");

app.get("/", LocalAuthMiddleware,(req,res)=>{
  res.send("Welcome to Our Hotel");
})
app.use("/person", personRoutes);
app.use("/menu", foodroutes);

const PORT = process.env.PORT || 3000; // if in process.env.PORT there is port value that it uses the current value otherwise it will use the another value
app.listen(PORT, () => {
  console.log("server is currently runnning");
});

//this is for the testing purpose
