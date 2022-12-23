//external imports
const path = require("path");
const multer = require("multer");
const createError = require("http-errors");

function uploader(
  sub_directory_name,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  const UPLOAD_DIRECTORY = path.join(
    __dirname,
    `../static/uploads/${sub_directory_name}`
  );

  // multer storage
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_DIRECTORY);
    },
    filename: (req, file, cb) => {
      const file_ext = path.extname(file.originalname);
      const file_name =
        file.originalname
          .replace(file_ext, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, file_name + file_ext);
    },
  });

  // multer Filter
  const multerFilter = (req, file, cb) => {
    if (allowed_file_types.includes(file.mimetype)) {
      if (req.files.length > max_file_size) {
        cb(`Maximum ${max_number_of_files} files are allowed to upload!`);
      } else {
        cb(null, true);
      }
    } else {
      cb(createError(error_msg));
    }
  };

  // final multer object
  const upload = multer({
    storage: multerStorage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: multerFilter,
  });

  return upload;
}

module.exports = uploader;
