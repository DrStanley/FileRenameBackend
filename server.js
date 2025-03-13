const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ensure 'uploads' directory exists before storing files
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use original filename
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file || !req.body.newFileName || !req.body.folderPath) {
    return res.status(400).json({ error: "Missing file, newFileName, or folderPath" });
  }

  const { newFileName, folderPath } = req.body;
  const fileExtension = path.extname(req.file.originalname);
  const finalFileName = newFileName.includes(".") ? newFileName : newFileName + fileExtension;
  const savePath = path.join(folderPath, finalFileName);

  // Ensure destination folder exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  try {
    fs.copyFileSync(req.file.path, savePath); // Move file to the new location
    fs.unlinkSync(req.file.path); // Remove temp file
    res.json({ message: `File saved successfully at ${savePath}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to save file" });
  }
});
app.get("/", (req, res) => {
   return res.send("Hello World!");
  });
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
