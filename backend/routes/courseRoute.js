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
import { requireSignIn, isAdmin } from "../Middleware/authMiddleWare.js";

const router = express.Router();

//create
router.post(
  "/create-course",
  formidable(),
  requireSignIn,
  isAdmin,
  createCourseController
);

//update
router.put(
  "/update-course/:id",
  formidable(),
  requireSignIn,
  isAdmin,
  updateCourseController
);

//delete
router.delete(
  "/delete-course/:id",
  requireSignIn,
  isAdmin,
  deleteCourseController
);

//get one
router.get("/get-course/:id", requireSignIn, getCourseController);

//get all
router.get("/get-courses", requireSignIn, getCoursesController);

//thumbnial
router.get("/get-thumbnail/:id", courseThumbnailController);

export default router;
