// external imports
const express = require("express");

// internal imports
const { getUsers } = require("../controller/userController");

const router = express.Router();

router.use("/", getUsers);

module.exports = router;
