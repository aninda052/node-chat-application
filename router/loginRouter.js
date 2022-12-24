// external imports
const express = require("express");
const multer = require("multer");

// internal imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();
const uploader = multer();

const page_name = "Login";

router.get("/", decorateHtmlResponse(page_name), getLogin);

router.post("/", uploader.none(), login);

module.exports = router;
