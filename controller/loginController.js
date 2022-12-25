// external imports
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/user");

function getLogin(req, res, next) {
  res.render("login");
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          id: user._id,
          role: user.role,
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        // res.cookie(process.env.COOKIE_NAME, token, {
        //   maxAge: process.env.JWT_SECRET,
        //   httpOnly: true,
        //   signed: true,
        // });
        // res.redirect("inbox");

        res.status(200).json({ user: userObject, token: token });
      } else {
        throw createError(401, "Wrong Username or Pasword");
      }
    } else {
      throw createError(401, "Wrong Username or Pasword");
    }
  } catch (err) {
    res.json({ errors: { common: { msg: err.message } } });
  }
}

module.exports = {
  getLogin,
  login,
};
