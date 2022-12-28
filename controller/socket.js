function messageListener(io, socket) {
  socket.on("message", (payload) => {
    io.to(socket.id).emit("message", {
      message: payload.body,
    });
  });
}

module.exports = messageListener;
