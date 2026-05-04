import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  authMiddleware,
  roleMiddleware(["admin"]),
  authController.register
);
authRouter.post(
  "/register-professor",
  authMiddleware,
  roleMiddleware(["admin"]),
  authController.registerProfessor
);
authRouter.post("/login", authController.login);

export default authRouter;
