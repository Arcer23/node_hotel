const express = require("express");
const router = express.Router();
const Person = require("./../models/person"); //Schema of Person

//making a post route to add the person details to the database
router.post("/", async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains the person data

    //here we are creating the new Person document using the mongoose Model
    const newPerson = new Person(data);

    //and now we are saving new person to the database
    const response = await newPerson.save();
    console.log("Your data have been saved ");
    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async function (req, res) {
  try {
    const data = await Person.find();
    console.log("Your data have been fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log("A error have been popped out ", error);
    res.status(500).json({ error: "internal server error" });
  }
});

// we are using this to find the records of a particular paramater
//for example if the parameter says chef the we should be able to fetch all the info about the chef
// this is exactly called the quert params in node js
router.get("/:workType", async function (req, res) {
  try {
    const workType = req.params.workType; //extracting the worktype from the particular parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      // we are searching for the worktype in the database
      const response = await Person.find({ work: workType });
      console.log("Response has been fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Parameter" });
    }
  } catch (error) {
    console.log("A error have been popped out ", error);
    res.status(500).json({ error: "internal server error" });
  }
});
//this method is used to update the particular record
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extracts the data from the URL parameter
    const updatedId = req.body; //updated data for the person

    const response = await Person.findByIdAndUpdate(personId, updatedId, {
      new: true, //return the updated document
      runValidators: true, // run mongoose validation
    });
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    console.log("Your data has been Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log("Error");
    res.status(500).json({ error: "Error Occured" });
  }
});

router.delete("/:id", async (res, req) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(200).json({ error: "Person Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
