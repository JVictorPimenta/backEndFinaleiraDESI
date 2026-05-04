import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const userRouter = express.Router();

userRouter.use(authMiddleware, roleMiddleware(["admin"]));

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export default userRouter;
