import JWT from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import fs from "fs";
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, answer } = req.fields;

    const { profile } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !email:
        return res.status(500).send({ error: "email is required" });

      case !password:
        return res.status(500).send({ error: "password is required" });
      case !answer:
        return res.status(500).send({ error: "answer is required" });
    }
    //user existence check
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User With that email already exists",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      answer,
    });
    if (profile) {
      user.profile.data = fs.readFileSync(profile.path);
      user.profile.contentType = profile.type;
    }
    await user.save();
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registeration Failed",
      error,
    });
  }
};

//post registration verification
export const loginController = async (req, res) => {
  console.log("consoles", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Enter valid Email or password",
      });
    }

    //check registration
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Incorrect Password",
      });
    }

    //validation token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    switch (true) {
      case !email:
        return res.status(500).send({ error: "Email is required" });
      case !answer:
        return res.status(500).send({ error: "answer is required" });
      case !newPassword:
        return res.status(500).send({ error: "newPassword is required" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "answer or email does not match",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error reseting Password",
    });
  }
};

//test
export const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.status(500).send({
        message: "password is required and must be atleat 6 chars",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModell.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profle updted successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error updating Profile",
      error,
    });
  }
};
