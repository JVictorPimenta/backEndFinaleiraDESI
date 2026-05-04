import express from "express";
import disciplineController from "../controllers/disciplineController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const disciplineRouter = express.Router();

disciplineRouter.get("/", authMiddleware, disciplineController.getAll);
disciplineRouter.get("/:id", authMiddleware, disciplineController.getById);

disciplineRouter.post("/", authMiddleware, roleMiddleware(["admin"]), disciplineController.create);
disciplineRouter.put("/:id", authMiddleware, roleMiddleware(["admin"]), disciplineController.update);
disciplineRouter.delete("/:id", authMiddleware, roleMiddleware(["admin"]), disciplineController.delete);

export default disciplineRouter;
