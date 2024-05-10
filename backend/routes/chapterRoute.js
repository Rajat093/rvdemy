import express from "express";
import {
  createChapterController,
  deleteChapterController,
  getChaptersController,
  updateChapterController,
} from "../controllers/chapterController.js";
import formidable from "express-formidable";
import { requireSignIn, isAdmin } from "../Middleware/authMiddleWare.js";

const router = express.Router();

//create
router.post(
  "/create-chapter",
  formidable(),
  requireSignIn,
  isAdmin,
  createChapterController
);

//update
router.put(
  "/update-chapter/:id",
  formidable(),
  requireSignIn,
  isAdmin,
  updateChapterController
);

//delete
router.delete(
  "/delete-chapter/:id",
  formidable(),
  requireSignIn,
  isAdmin,
  deleteChapterController
);

//get
router.get("/get-chapters", formidable(), getChaptersController);

export default router;
