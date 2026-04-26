import express from "express";
import classController from "../controllers/classController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const classRouter = express.Router();

// Rotas públicas (para login)
classRouter.get("/", authMiddleware, classController.getAll);
classRouter.get("/:id", authMiddleware, classController.getById);

// Rotas protegidas (apenas admin)
classRouter.post("/", authMiddleware, roleMiddleware(["admin"]), classController.create);
classRouter.put("/:id", authMiddleware, roleMiddleware(["admin"]), classController.update);
classRouter.delete("/:id", authMiddleware, roleMiddleware(["admin"]), classController.delete);

export default classRouter;
