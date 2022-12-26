// external imports
const express = require("express");
const createError = require("http-errors");

// internal imports
const Conversation = require("../models/conversation");
const User = require("../models/user");
const Message = require("../models/message");

async function getInbox(req, res, next) {
  try {
    const conversations = await Conversation.find({
      $or: [
        { "creator._id": req.user._id },
        { "participant._id": req.user._id },
      ],
    });
    res.locals.data = conversations;
    res.locals.loggedInUser = req.user;
    res.render("inbox");
  } catch (err) {
    next(err);
  }
}

async function createConversation(req, res, next) {
  const participant = await User.findById(req.body.participantId).select(
    "_id name avatar"
  );

  if (participant) {
    const conversation = new Conversation({
      creator: req.user,
      participant: participant,
    });
    try {
      await conversation.save();
      res.status(200).json({
        msg: "Conversation create successful",
      });
    } catch (err) {
      next(err);
    }
  } else {
    next(createError(404, "participant not found"));
  }
}

async function getMessage(req, res, next) {
  try {
    const messaages = await Message.find({
      conversation_id: req.params.conversationId,
    });
    res.status(200).json({
      messages: messaages,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getInbox,
  createConversation,
  getMessage,
};
