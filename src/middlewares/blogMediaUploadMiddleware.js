import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = "uploads/blog-media";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (req, file, callback) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    const extension = path.extname(file.originalname);

    callback(null, `${uniqueName}${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(
      new Error(
        "Only JPEG, PNG, WebP, MP4, WebM and MOV files are allowed"
      ),
      false
    );
  }

  callback(null, true);
};

const uploadBlogMedia = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export default uploadBlogMedia;