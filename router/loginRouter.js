// external imports
const express = require("express");
const multer = require("multer");

// internal imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const { redirectLoggedIn } = require("../middlewares/common/loginRequire");

const router = express.Router();
const uploader = multer();

const page_name = "Login";

router.get("/", decorateHtmlResponse(page_name), redirectLoggedIn, getLogin);

router.post("/", uploader.none(), login);

module.exports = router;
