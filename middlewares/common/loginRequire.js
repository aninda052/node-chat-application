// external imports
const jwt = require("jsonwebtoken");

function loginRequire(req, res, next) {
  const token = req.cookies[process.env.COOKIE_NAME]
    ? req.cookies[process.env.COOKIE_NAME]
    : null;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    if (res.locals.html) {
      res.redirect("/login");
    } else {
      res.status(401).json({
        errors: {
          common: {
            mgs: "Authentication Failour",
          },
        },
      });
    }
  }
}

module.exports = loginRequire;
