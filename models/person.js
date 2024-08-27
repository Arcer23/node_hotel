const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for a person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  age: {
    type: Number, // Age is optional
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"], // Work can only be one of these three values
  },
  username: {
    type: String,
    required: true, // Username is required
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Middleware to hash the password before saving a person
personSchema.pre("save", async function (next) {
  const person = this;

  // If the password hasn't been modified, move to the next middleware
  if (!person.isModified("password")) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    person.password = await bcrypt.hash(person.password, salt);

    next(); // Proceed with saving the document
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Method to compare a candidate password with the stored password
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error; // Throw an error if password comparison fails
  }
};

// Create and export the Person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
