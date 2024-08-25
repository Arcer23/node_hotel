const express = require("express");
const router = express.Router();
const Food = require("./../models/MenuItems");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const new_details = new Food(data);
    const finding = await new_details.save();
    console.log("The data you have provided have been saved");
    res.status(200).json(finding);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:taste", async function (req, res) {
  try {
    const taste = req.params.taste;
    if (taste == "sour" || taste == "spicy" || taste == "sweet") {
      const response = await Food.find({ taste: taste });
      console.log("Your data has been fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid Parameter" });
    }
  } catch (error) {
    console.log("Error Popped Out here ", error);
    res.status(500).json({ error: "Error Popped Out" });
  }
});
router.get("/", async function (req, res) {
  try {
    const data = await Food.find();
    console.log("Your data has been successfully fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
