// external imports
const bcrypt = require("bcrypt");

// internal imports
const User = require("../models/user");

function getUsers(req, res, next) {
  res.render("users");
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
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  addUser,
};
