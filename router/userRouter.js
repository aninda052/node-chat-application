// external imports
const express = require("express");

// internal imports
const { getUsers } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const uploader = require("../middlewares/users/avaterUpload");

const router = express.Router();
const page_name = "Users";

//login page
router.get("/", decorateHtmlResponse(page_name), getUsers);

// add user
router.post("/add-user", uploader);

module.exports = router;
