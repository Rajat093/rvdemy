import SectionModel from "../Models/SectionModel.js";
import dotenv from "dotenv";
import courseModel from "../Models/courseModel.js";
import chapterModel from "../Models/chapterModel.js";

//dotenv config

dotenv.config();

//create section
export const createSectionController = async (req, res) => {
  try {
    const { CourseId, name, order, chapters } = req.body;
    if (!CourseId) {
      return res.status(404).json({ message: "Course ID is required" });
    }
    let existingCourse = await courseModel.findOne({ _id: CourseId });
    if (!existingCourse) {
      return res.status(404).json({ message: "No such course exists" });
    }
    if (chapters.length) {
      let chapterIds = [];
      for (let i = 0; i < chapters.length; i++) {
        let newChapter = new chapterModel(chapters[i]);
        await newChapter.save();
        chapterIds.push(newChapter.id);
      }
      const section = new SectionModel({
        CourseId, // Include CourseId here
        name,
        order,
        chapters: chapterIds,
      });
      await section.save();
      return res
        .status(201)
        .json({ message: "Section created successfully", section });
    } else {
      return res.status(500).json({ message: "No chapters found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Creating Section",
      error,
    });
  }
};

// get sections
export const getSectionsController = async (req, res) => {
  try {
    let { id } = req.params;
    const sections = await SectionModel.find({ CourseId: id }).populate({
      path: "chapters",
      options: { sort: { order: 1 } },
    });
    res.status(200).send({
      success: true,
      message: "successfully fetched all sections",
      sections,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error getting all sections",
      error,
    });
  }
};

//delete section controller
export const deleteSectionController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Section ID is required" });
    }
    const section = await SectionModel.findById(id);
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    await chapterModel.deleteMany({ _id: { $in: section.chapters } });
    await SectionModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting section",
      error,
    });
  }
};

//update section
export const updateSectionController = async (req, res) => {
  try {
    const { name, order } = req.body;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !order:
        return res.status(500).send({ error: "order is required" });
    }
    const section = await SectionModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Section Updated Successfully",
      section,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating Section",
      error,
    });
  }
};
