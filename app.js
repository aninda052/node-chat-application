// external imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const mainRouter = require("./router/mainRouter");

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
app.use("", mainRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
