const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

require('dotenv').config();

const PORT = process.env.PORT || 3000 ;

app.get("/", (req, res) => {
  res.send("welcome to our hotel");
});

// import router files

const menuRoutes = require("./routes/menuRoutes"); //
const personRoutes = require("./routes/personRoutes");

// use router files
app.use("/menu", menuRoutes);
app.use("/person", personRoutes);

app.listen(PORT, () => {
  console.log("listening on 3000");
});
