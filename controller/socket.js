//external imports
const path = require("path");
const fs = require("fs");

function messageListener(io, socket) {
  socket.on("message", (files, payload) => {
    if (files) {
      const UPLOAD_DIRECTORY = path.join(
        __dirname,
        `../static/uploads/${process.env.AVATAR_UPLOAD_DIRECTORY}/test.jpg`
      );
      fs.writeFile(UPLOAD_DIRECTORY, files[0], (err) => {
        console.log({ message: err ? "failure" : "success" });
      });
    }
    io.to(socket.id).emit("message", {
      message: payload.body,
    });
  });
}

module.exports = messageListener;
