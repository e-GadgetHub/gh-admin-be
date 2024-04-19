import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

// const fileFilter = (req, file, cb) => {
//     if (!file.mimetype.match(/jpe|jpeg|png|gif/)) {
//         cb(new Error("File is not supported"), false);
//         return;
//     }

//     cb(null, true);
// };

const upload = multer({ storage });

export default upload;
