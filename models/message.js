// external import
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      _id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    reciever: {
      _id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    conversation_id: mongoose.Types.ObjectId,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
