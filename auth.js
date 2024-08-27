const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

// Local Strategy for Passport
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      console.log("Received Credentials:", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const isPasswordMatch = await user.comparePassword(password);
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

// Initialize Passport
const initializePassport = (app) => {
  app.use(passport.initialize());
};

const LocalAuthMiddleware = passport.authenticate("local", { session: false });

module.exports = {
  initializePassport,
  LocalAuthMiddleware,
};
