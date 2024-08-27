const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const personRoutes = require("./routes/personRoutes");
const foodRoutes = require("./routes/food");
const { initializePassport, LocalAuthMiddleware } = require("./auth");
const db = require("./db");

// Load environment variables
dotenv.config();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Logging middleware
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest);

// Initialize Passport
initializePassport(app);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Our Hotel");
});
app.use("/person", personRoutes);
app.use("/menu", foodRoutes);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is currently running");
});
