const mongoose = require("mongoose");

//now we are creating the schema because we are going to store some information about a particular person or a thing

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work:{
    type:String,
    enum:['chef','manager','waiter']
  }
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
