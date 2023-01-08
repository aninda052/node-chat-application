//external imports
const path = require("path");
const fs = require("fs");

let connectedUsers = {};

function trackUserSocketConnection(socket) {
  const userid = socket.handshake.query.userid;
  socket.userid = userid;
  connectedUsers[userid] = socket.id;
}

function messageListener(io, socket) {
  socket.on("message", (attachments, payload) => {
    // if (attachments[0] != undefined) {
    //   const UPLOAD_DIRECTORY = path.join(
    //     __dirname,
    //     `../static/uploads/${process.env.AVATAR_UPLOAD_DIRECTORY}/test.jpg`
    //   );
    //   fs.writeFile(UPLOAD_DIRECTORY, attachments[0], (err) => {
    //     console.log({ message: err ? "failure" : "success" });
    //   });
    // }
    // console.log(socket.id);
    const receiverId = payload.body.receiverId;
    const receiverSocketId = connectedUsers[receiverId] || "";

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", {
      message: payload.body,
    });
    }
  });
}

module.exports = { messageListener, trackUserSocketConnection };
