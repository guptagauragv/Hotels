const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/menu");

// post route to add menu
router.post("/", async (req, res) => {
  try {
    const menudata = req.body; // Assuming the req.body contains the person data

    // create a new person document using mongoose model
    const newmenu = new MenuItem(menudata);

    const response = await newmenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method to get menu data
router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tastetype = req.params.taste;
    if (tastetype == "sour" || tastetype == "sweet" || tastetype == "spicy") {
      const response = await MenuItem.find({ taste: tastetype });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid taste type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // extract menuitem id from the url parameter
    const updatedmenuData = req.body; // updated menu data

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedmenuData, {
      new: true, // return updated menu item data
      runValidators: true, // run mongoose validations
    });
    if (!response) {
      res.status(404).json({ error: "Menu item Not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      res.status(404).json({ error: "Menu item not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "menu item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Comment added for testing
module.exports = router;
