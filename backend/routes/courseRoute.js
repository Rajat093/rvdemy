import express from "express";
import {
  courseThumbnailController,
  createCourseController,
  deleteCourseController,
  getCourseController,
  getCoursesController,
  updateCourseController,
} from "../controllers/courseController.js";
import formidable from "express-formidable";

const router = express.Router();

//create
router.post("/create-course", formidable(), createCourseController);

//update
router.put("/update-course/:id", formidable(), updateCourseController);

//delete
router.delete("/delete-course/:id", deleteCourseController);

//get one
router.get("/get-course/:id", getCourseController);

//get all
router.get("/get-courses", getCoursesController);

//thumbnial
router.get("/get-thumbnail/:id", courseThumbnailController);

export default router;
