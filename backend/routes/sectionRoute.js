import express from "express";
import formidable from "express-formidable";
import {
  createSectionController,
  deleteSectionController,
  getSectionsController,
  updateSectionController,
} from "../controllers/sectionController.js";
import { isAdmin, requireSignIn } from "../Middleware/authMiddleWare.js";

const router = express.Router();

//create
router.post("/create-section", requireSignIn, isAdmin, createSectionController);

//get
router.get("/get-sections/:id", getSectionsController);

//delete
router.delete(
  "/delete-section/:id",
  requireSignIn,
  isAdmin,
  deleteSectionController
);

//update
router.put(
  "/update-section/:id",
  requireSignIn,
  isAdmin,
  updateSectionController
);

export default router;
