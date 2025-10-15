const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

//post route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the req.body contains the person data

    // create a new person document using mongoose model
    const newPerson = new Person(data);

    // saving the new person to database
    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:work", async (req, res) => {
  // after colon "work" is a variable

  try {
    const workType = req.params.work; //extract the work type from the URL parameter
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work Type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id from the URL parameter
    const UpdatedPersonData = req.body; // updated data for the person
    const response = await Person.findByIdAndUpdate(
      personId,
      UpdatedPersonData,
      {
        new: true, // Return the updated person data
        runValidators: true, // run mongoose validations
      }
    );
    if (!response) {
      res.status(404).json({ error: "Person Not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id from the URL parameter
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "Person Not found" });
    }

    console.log("Data deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//comment for testing
module.exports = router;
