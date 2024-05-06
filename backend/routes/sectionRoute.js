import express from "express";
import formidable from "express-formidable";
import {
  createSectionController,
  deleteSectionController,
  getSectionsController,
  updateSectionController,
} from "../controllers/sectionController.js";

const router = express.Router();

//create
router.post("/create-section", createSectionController);

//get
router.get("/get-sections/:id", getSectionsController);

//delete
router.delete("/delete-section/:id", deleteSectionController);

//update
router.put("/update-section/:id", updateSectionController);

export default router;
