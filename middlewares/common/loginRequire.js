// external imports
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function loginRequire(req, res, next) {
  let token;

  if (res.locals.html) {
    token = req.cookies[process.env.COOKIE_NAME]
      ? req.cookies[process.env.COOKIE_NAME]
      : null;
  } else {
    token = req.headers.authorization ? req.headers.authorization : null;
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } else {
      throw createError(401, "Authentication Failour");
    }
  } catch (err) {
    if (res.locals.html) {
      if (token) {
        res.clearCookie(process.env.COOKIE_NAME);
      }

      res.redirect("/login");
    } else {
      res.status(err.status).json({
        errors: {
          common: {
            mgs: err.message,
          },
        },
        redirect: "/login",
      });
    }
  }
}

function redirectLoggedIn(req, res, next) {
  const token = req.cookies[process.env.COOKIE_NAME]
    ? req.cookies[process.env.COOKIE_NAME]
    : null;

  if (token) {
    res.redirect("/inbox");
  } else {
    next();
  }
}

module.exports = { loginRequire, redirectLoggedIn };
