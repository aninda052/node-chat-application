function decorateHtmlResponse(page_name) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = page_name;
    next();
  };
}

module.exports = decorateHtmlResponse;
