// external imports
const express = require("express");

function getInbox(req, res, next) {
  res.render("inbox", {
    title: "Inbox Page",
  });
}

module.exports = {
  getInbox,
};
