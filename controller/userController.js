// external imports
const express = require("express");

function getUsers(req, res, next) {
  res.render("users");
}

module.exports = {
  getUsers,
};
