import JWT from "jsonwebtoken";
import userModel from "../Models/userModel.js";

//protected route based on token

export const requireSignIn = async (req, res, next) => {
  try {
    JWT.verify(
      req.headers.authorization,
      process.env.JWT_KEY,
      function (err, decoded) {
        if (req.path !== "/get-courses" && err) {
          console.log(err);
          return res.status(403).send({ message: "Unauthorised" });
        }
        if (decoded) {
          req.user = decoded;
        }
        next();
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== "admin") {
      return res.status(400).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
