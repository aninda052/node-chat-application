// external imports
const bcrypt = require("bcrypt");
const createError = require("http-errors");

// internal imports
const User = require("../models/user");

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

// add user
async function addUser(req, res, next) {
  let new_user;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    new_user = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    new_user = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    const result = await new_user.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({
      message: "User Delete Successful",
    });
  } catch (err) {
    next(createError(404, "User not found"));
  }
}

async function searchUsers(req, res, next) {
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: req.params.userPrefix } },
        { email: { $regex: req.params.userPrefix } },
      ],
    })
      .select("name _id avatar")
      .limit(7);

    res.status(200).json({
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  searchUsers,
};
