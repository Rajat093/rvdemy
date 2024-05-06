import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerUserController,
  testController,
  updateUserProfile,
} from "../controllers/authController.js";
import formidable from "express-formidable";
import { requireSignIn, isAdmin } from "../Middleware/authMiddleWare.js";
const router = express.Router();

//Register
router.post("/register", formidable(), registerUserController);

//login
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

//update user
router.post("/update-user", requireSignIn, updateUserProfile);

//test
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
