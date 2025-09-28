import e from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

function fileFilter(req: e.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Invalid image type"));
    }

    if (!file.originalname) {
        return cb(new Error("File must have a name"));
    }

    cb(null, true);
}

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter
})
