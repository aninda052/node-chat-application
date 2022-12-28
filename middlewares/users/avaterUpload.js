// internal imports
const uploader = require("../../utilities/singleUploader");

function avaterUpload(req, res, next) {
  //uploader function will return a multer object
  const upload = uploader(
    process.env.AVATAR_UPLOAD_DIRECTORY,
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avaterUpload;
