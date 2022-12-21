// external imports
const express = require("express");

function getUsers(req, res, next) {
  res.render("users", {
    title: "Users Page",
  });
}

module.exports = {
  getUsers,
};
