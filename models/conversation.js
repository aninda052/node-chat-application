// external imports
const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    creator: {
      _id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    participant: {
      _id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
