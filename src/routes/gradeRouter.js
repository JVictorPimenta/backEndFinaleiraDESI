import express from "express";
import gradeController from "../controllers/gradeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const gradeRouter = express.Router();

// Rotas públicas (para login)
gradeRouter.get("/", authMiddleware, gradeController.getAll);
gradeRouter.get("/:id", authMiddleware, gradeController.getById);

// Rotas protegidas (apenas admin e professor)
gradeRouter.post("/", authMiddleware, roleMiddleware(["admin", "professor"]), gradeController.create);
gradeRouter.put("/:id", authMiddleware, roleMiddleware(["admin", "professor"]), gradeController.update);
gradeRouter.delete("/:id", authMiddleware, roleMiddleware(["admin"]), gradeController.delete);

export default gradeRouter;
