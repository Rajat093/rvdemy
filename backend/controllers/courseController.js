import courseModel from "../Models/courseModel.js";
import dotenv from "dotenv";
import fs from "fs";
//config
dotenv.config();

//create Course Controller

export const createCourseController = async (req, res) => {
  try {
    const { Name, description } = req.fields;
    const { thumbnail } = req.files;

    switch (true) {
      case !Name:
        return res.status(500).send({ error: "Name is required" });
      case !thumbnail:
        return res.status(500).send({ error: "thumbnail is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
    }
    const Course = new courseModel({ ...req.fields });
    if (thumbnail) {
      Course.thumbnail.data = fs.readFileSync(thumbnail.path);
      Course.thumbnail.contentType = thumbnail.type;
    }
    await Course.save();
    res.status(201).send({
      success: true,
      message: "Course Created Successfully",
      Course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating Course",
    });
  }
};

//update Course controller

export const updateCourseController = async (req, res) => {
  try {
    const { Name, description } = req.fields;
    const { thumbnail } = req.files;
    switch (true) {
      case !Name:
        return res.status(500).send({ error: "Name is required" });
      case !thumbnail:
        return res.status(500).send({ error: "thumbnail is required" });
      case !description:
        return res.status(500).send({ error: "description is required" });
    }
    const Course = await courseModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    if (thumbnail) {
      Course.thumbnail.data = fs.readFileSync(thumbnail.path);
      Course.thumbnail.contentType = thumbnail.type;
    }
    await Course.save();
    res.status(201).send({
      success: true,
      message: "Course Updated Successfully",
      Course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Updating Course",
    });
  }
};

//delete
export const deleteCourseController = async (req, res) => {
  try {
    await courseModel.findByIdAndDelete(req.params.id).select("-thumbnail");
    res.status(200).send({
      success: true,
      message: " successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting COurse",
      error,
    });
  }
};

//get course
export const getCourseController = async (req, res) => {
  try {
    const course = await courseModel.findOne({ _id: req.params.id });

    res.status(200).send({
      success: true,
      message: "Course is",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Getting Course",
      error,
    });
  }
};

// get courses
export const getCoursesController = async (req, res) => {
  try {
    const courses = await courseModel.find({});
    const total = courses.length;
    res.status(200).send({
      success: true,
      message: "All the courses",
      total,
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all courses",
      error,
    });
  }
};

export const courseThumbnailController = async (req, res) => {
  try {
    const course = await courseModel
      .findById(req.params.id)
      .select("thumbnail");
    if (course.thumbnail.data) {
      res.set("Content-type", course.thumbnail.contentType);
      return res.status(200).send(course.thumbnail.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting course thumbnail",
      error,
    });
  }
};
