// external imports
const express = require("express");

function getLogin(req, res, next) {
  res.render("index");
}

module.exports = {
  getLogin,
};
