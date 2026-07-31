import multer from "multer"
import path from "path";

const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/images")
    },
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const extension = path.extname(file.originalname);
        callback(null, `${uniqueName}${extension}`)
    }
})

const fileImageFilter = (req, file, callback) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(
            new Error("Only JPEG, PNG and WebP images are allowed"),
            false
        );
    }
};
const ImageUpload = multer({
    imageStorage, fileImageFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const videoStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/videos")
    },
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        const extension = path.extname(file.originalname);
        callback(null, `${uniqueName}${extension}`)
    }
})


const videoFilter = (req, file, callback) => {
    const allowedTypes = [
        "video/mp4",
        "video/webm",
        "video/quicktime",
    ]

    if (!allowedTypes.includes(file.mimetype)) {
        return callback(
            new Error("Only MP4, WebM and MOV videos are allowed"),
            false
        );
    }

    callback(null, true);
}

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFilter,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

export {ImageUpload, uploadVideo}