// external imports
const express = require("express");

// internal imports
const { getUsers } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();
const page_name = "Users";

router.use("/", decorateHtmlResponse(page_name), getUsers);

module.exports = router;
