const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
app.use(express.static(path.join(__dirname, "static")));

// set view engine
app.set("view engine", "ejs");

// routing setup

// error handling

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
