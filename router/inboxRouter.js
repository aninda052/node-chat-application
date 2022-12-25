// external imports
const express = require("express");

// internal imports
const {
  getInbox,
  createConversation,
} = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { loginRequire } = require("../middlewares/common/loginRequire");

const router = express.Router();
const page_name = "Inbox";

router.get("/", decorateHtmlResponse(page_name), loginRequire, getInbox);

router.post("/create-conversation", loginRequire, createConversation);

module.exports = router;
