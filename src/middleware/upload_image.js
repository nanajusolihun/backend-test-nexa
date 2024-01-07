import multer from "multer";
import path from "path";
import messages from "../utils/messages.js";

const file_size = 1;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `karyawan_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

// Set connection multer with storage
const uploading = multer({
  storage: storage,
  limits: { fileSize: file_size * 1024 * 1024 },

  //   Validation ext file
  fileFilter: (req, file, callback) => {
    const type = path.extname(file.originalname).toLowerCase();
    if ([".png", ".jpg", ".jpeg"].includes(type)) callback(null, true);
    else callback({ error: "Extention image harus png/jpg/jpeg", code: "wrongtype" }, false);
  },
});

// Middleware
const uploadImage = (req, res, next) => {
  const upload = uploading.single("image");

  if (upload) {
    upload(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          messages(res, 413, `Maximal file ${file_size}Mb`);
        } else if (err.code === "wrongtype") {
          messages(res, 400, err);
        } else {
          messages(res, 500, "Something wrong when upload image");
        }
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

export default uploadImage;
