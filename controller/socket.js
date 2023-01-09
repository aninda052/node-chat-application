//external imports
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// internal imports
const Message = require("../models/message");
const User = require("../models/user");

let connectedUsers = {};

function messageListener(io, socket) {
  socket.on("message", async (attachments, payload) => {
    if (attachments[0] != undefined) {
      const UPLOAD_DIRECTORY = path.join(
        __dirname,
        `../static/uploads/${process.env.AVATAR_UPLOAD_DIRECTORY}/test.jpg`
      );
      fs.writeFile(UPLOAD_DIRECTORY, attachments[0], (err) => {
        console.log({ message: err ? "failure" : "success" });
      });
    }

    const receiverId = payload.body["recieverId"];
    const receiverSocketId = connectedUsers[receiverId] || "";

    const receiver = await User.findById(receiverId);

    const message = new Message({
      sender: socket.user,
      reciever: receiver,
      message: payload.body.message,
      conversation_id: payload.body["conversationId"],
    });
    message.save();

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", {
        message: {
          sender: {
            _id: socket.user._id,
            name: socket.user.name,
            avatar: socket.user.avatar,
          },
          message: payload.body.message,
          attachments: attachments,
        },
      });
    }
  });
}

const authSocketMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token
    ? socket.handshake.auth.token
    : null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    connectedUsers[decoded._id] = socket.id;
  } catch (err) {
    return next(new Error("NOT AUTHORIZED"));
  }
  next();
};

module.exports = {
  messageListener,
  authSocketMiddleware,
};
