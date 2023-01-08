// external imports
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const http = require("http");
const socket = require("socket.io");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const mainRouter = require("./router/mainRouter");
const {
  messageListener,
  trackUserSocketConnection,
} = require("./controller/socket");

dotenv.config();

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

const app = express();

const server = http.createServer(app);
// socket creation
const io = socket(server, {
  path: "/chat",
});

io.on("connection", function (socket) {
  trackUserSocketConnection(socket);

  messageListener(io, socket);
});

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set view directory
app.set("views", path.join(__dirname, "views"));

// set static folder
app.use(express.static(path.join(__dirname, "static")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("", mainRouter);

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
