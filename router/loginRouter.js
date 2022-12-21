// external imports
const express = require("express");

// internal imports
const { getLogin } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();
const page_name = "Login";

router.use("/", decorateHtmlResponse(page_name), getLogin);

module.exports = router;
