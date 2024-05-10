import SectionModel from "../Models/SectionModel.js";
import chapterModel from "../Models/chapterModel.js";
import dotenv from "dotenv";
import courseModel from "../Models/courseModel.js";

dotenv.config();

export const createChapterController = async (req, res) => {
  try {
    const { Name, order, SectionId } = req.body;
    const VideoUrl = req.file.path; // Access the uploaded file path
    const { CourseId } = await SectionModel.findById(SectionId);
    const { createdBy } = await courseModel.findById(CourseId);
    switch (true) {
      case !Name:
        return res.status(500).send({ error: "Name is required" });
      case !order:
        return res.status(500).send({ error: "Order is required" });
      case !SectionId:
        return res.status(500).send({ error: "Section Id is required" });
      case !VideoUrl:
        return res.status(500).send({ error: "Url is required" });
    }
    if (createdBy == req.user._id) {
      let existingSection = await SectionModel.findOne({ _id: SectionId });
      if (!existingSection) {
        return res
          .status(404)
          .json({ message: "Section with this id doesn't exist" });
      }

      const chapter = new chapterModel({
        Name,
        order,
        SectionId,
        VideoUrl,
      });

      await chapter.save();

      existingSection.chapters.push(chapter._id);
      await existingSection.save();

      res.status(201).json({
        success: true,
        message: "Chapter created",
        chapter,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating chapter",
      error: error.message,
    });
  }
};

//update chapter
export const updateChapterController = async (req, res) => {
  try {
    const { Name, order, SectionId, VideoUrl } = req.fields;
    const { CourseId } = await SectionModel.findById(SectionId);
    const { createdBy } = await courseModel.findById(CourseId);
    switch (true) {
      case !Name:
        return res.status(500).send({ error: "Name is required" });
      case !order:
        return res.status(500).send({ error: "order is required" });
      case !SectionId:
        return res.status(500).send({ error: "SectionId is required" });
      case !VideoUrl:
        return res.status(500).send({ error: "VideoUrl is required" });
    }
    if (createdBy == req.user._id) {
      const chapter = await chapterModel.findByIdAndUpdate(
        req.params.id,
        { ...req.fields },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Chapter updated ",
        chapter,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error Updating Capter",
      error,
    });
  }
};

//delete
export const deleteChapterController = async (req, res) => {
  try {
    const { id } = req.params;
    const { SectionId } = await chapterModel.findById(id);
    const { CourseId } = await SectionModel.findById(SectionId);
    const { createdBy } = await courseModel.findById(CourseId);

    if (createdBy == req.user._id) {
      const deletedChapter = await chapterModel.findByIdAndDelete(id);
      if (!deletedChapter) {
        return res.status(404).send({
          success: false,
          message: "Chapter not found",
        });
      }

      // Find the section associated with the chapter
      const section = await SectionModel.findOne({
        _id: deletedChapter.SectionId,
      });
      if (section) {
        // Remove the chapter reference from the section
        section.chapters.pull(req.params.id);
        await section.save();
      }

      res.status(200).send({
        success: true,
        message: "Chapter deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Chapter",
      error: error.message,
    });
  }
};

//get chapters
export const getChaptersController = async (req, res) => {
  try {
    const chapters = await chapterModel.find({});
    res.status(200).send({
      success: true,
      message: "All chapters",
      chapters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " Cant get all chapters",
    });
  }
};
