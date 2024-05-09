import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import courseRoute from "./routes/courseRoute.js";
import chapterRoute from "./routes/chapterRoute.js";
import sectionRoute from "./routes/sectionRoute.js";
import authRoute from "./routes/authRoutes.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { createChapterController } from "./controllers/chapterController.js";

// Config env
dotenv.config();

// Connect to DB
connectDB();

// Init express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Multer Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDirectory = path.resolve(__dirname, "../../uploads/");

// Check if the upload directory exists, if not, create it
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  // limits: { fileSize: 100000000 }, // 100MB max file size
}).single("video");

// API route for handling file upload and creating a chapter
app.post(
  "/api/v1/chapter/create-chapter",
  upload,
  createChapterController,
  (req, res) => {
    // Call createChapterController function here passing req and res
  }
);

// Routes
app.use("/api/v1/section", sectionRoute);
app.use("/api/v1/chapter", chapterRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/auth", authRoute);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
