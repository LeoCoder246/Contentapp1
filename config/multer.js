const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory before uploading
const upload = multer({ storage });

module.exports = upload;
