// external imports
const express = require("express");

// internal imports
const { getInbox } = require("../controller/inboxController");

const router = express.Router();

router.use("/", getInbox);

module.exports = router;
