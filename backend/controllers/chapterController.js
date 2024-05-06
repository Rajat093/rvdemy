import chapterModel from "../Models/chapterModel.js";
import dotenv from "dotenv";

dotenv.config();

//create chapter
export const createChapterController = async (req, res) => {
  try {
    const { Name, order, SectionId, VideoUrl } = req.fields;
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
    const chapter = new chapterModel({ ...req.fields });
    await chapter.save();
    res.status(200).send({
      success: true,
      message: "Chapter Created ",
      chapter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error Creating Capter",
      error,
    });
  }
};

//update chapter
export const updateChapterController = async (req, res) => {
  try {
    const { Name, order, SectionId, VideoUrl } = req.fields;
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
    await chapterModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Chapter",
      error,
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
