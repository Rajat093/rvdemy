import express from "express";
import dotenv, { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import courseRoute from "./routes/courseRoute.js";
import chapterRoute from "./routes/chapterRoute.js";
import sectionRoute from "./routes/sectionRoute.js";
import authRoute from "./routes/authRoutes.js";

//config env
dotenv.config();

//connect DB
connectDB();

//rest
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//routes
app.use("/api/v1/section", sectionRoute);
app.use("/api/v1/chapter", chapterRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/auth", authRoute);
//port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
