// external imports
const express = require("express");

// internal imports
const {
  getUsers,
  addUser,
  deleteUser,
} = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const uploader = require("../middlewares/users/avaterUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators.js");
const loginRequire = require("../middlewares/common/loginRequire");

const router = express.Router();
const page_name = "Users";

//login page
router.get("/", decorateHtmlResponse(page_name), loginRequire, getUsers);

// add user
router.post(
  "/add-user",
  loginRequire,
  uploader,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// delete user
router.delete("/delete-user/:userId", loginRequire, deleteUser);

module.exports = router;
