//external imports
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

let connectedUsers = {};

function messageListener(io, socket) {
  socket.on("message", (attachments, payload) => {
    if (attachments[0] != undefined) {
      const UPLOAD_DIRECTORY = path.join(
        __dirname,
        `../static/uploads/${process.env.AVATAR_UPLOAD_DIRECTORY}/test.jpg`
      );
      fs.writeFile(UPLOAD_DIRECTORY, attachments[0], (err) => {
        console.log({ message: err ? "failure" : "success" });
      });
    }

    const receiverId = payload.body["conversationId"];
    const receiverSocketId = connectedUsers[receiverId] || "";

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", {
        message: {
          sender: payload.body.sender,
          message: message,
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
