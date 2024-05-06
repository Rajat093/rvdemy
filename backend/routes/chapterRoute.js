import express from "express";
import {
  createChapterController,
  deleteChapterController,
  getChaptersController,
  updateChapterController,
} from "../controllers/chapterController.js";
import formidable from "express-formidable";

const router = express.Router();

//create
router.post("/create-chapter", formidable(), createChapterController);

//update
router.put("/update-chapter/:id", formidable(), updateChapterController);

//delete
router.delete("/delete-chapter/:id", formidable(), deleteChapterController);

//get
router.get("/get-chapters", formidable(), getChaptersController);

export default router;
