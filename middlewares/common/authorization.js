const createError = require("http-errors");

function requirRole(allowdRoles) {
  return (req, res, next) => {
    if (req.user.role && allowdRoles.includes(req.user.role)) {
      next();
    } else {
      next(createError(403, "You are not authorized to access"));
    }
  };
}

module.exports = { requirRole };
