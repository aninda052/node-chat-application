// external imports
const express = require("express");

// internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();
const page_name = "Inbox";

router.use("/", decorateHtmlResponse(page_name), getInbox);

module.exports = router;
