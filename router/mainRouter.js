// external imports
const express = require("express");

// internal imports
const loginRouter = require("./loginRouter");
const userRouter = require("./userRouter");
const inboxRouter = require("./inboxRouter");

const router = express.Router();

router.use("/users", userRouter);
router.use("/inbox", inboxRouter);
router.use("/login", loginRouter);

module.exports = router;
