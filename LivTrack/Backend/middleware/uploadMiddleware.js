// const multer = require("multer");

// // Set storage options (in-memory storage for simplicity)
// const storage = multer.memoryStorage();

// // File upload settings
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/")) {
//       return cb(new Error("Only image files are allowed"), false);
//     }
//     cb(null, true);
//   },
// });

// // Middleware function for handling uploads
// module.exports = upload; // 'image' is the field name in the form

////////

const multer = require("multer");

// Set up storage (in-memory for quick processing)
const storage = multer.memoryStorage();

// Configure Multer with file filter
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

// Export multer instance (not `upload.single(...)` directly)
module.exports = upload;
