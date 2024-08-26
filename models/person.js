const mongoose = require("mongoose");

//now we are creating the schema because we are going to store some information about a particular person or a thing
const bcrypt = require('bcrypt')
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  //we are going to hash the password if it has been modified (or is new);
  if (!person.isModified("password")) return next();
  try {
    //now we are generating the hash password
    const salt = await bcrypt.genSalt(10);
    //hash password

    const hashedpassword = await bcrypt.hash(person.password, salt);

    //overriding the plain password with the hashed one

    person.password = hashedpassword;

    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparepassword = async function (candidatePassword) {
  try{
    const isMatch = await bcrypt.compare(candidatePassword , this.password);
    return isMatch;
  }catch(error){
    throw error;
  }
}

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
