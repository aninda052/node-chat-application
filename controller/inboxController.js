// external imports
const express = require("express");

function getInbox(req, res, next) {
  res.render("inbox");
}

async function createConversation(req, res, next) {
  res.json({
    userId: req.body.userId,
    username: req.body.username,
  });
}

module.exports = {
  getInbox,
  createConversation,
};
