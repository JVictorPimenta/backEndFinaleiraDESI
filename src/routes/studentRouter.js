import express from "express";
import studentController from "../controllers/studentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const studentRouter = express.Router();

// Rotas públicas (para login)
studentRouter.get("/", authMiddleware, studentController.getAll);
studentRouter.get("/:id", authMiddleware, studentController.getById);

// Rotas protegidas (apenas admin e professor)
studentRouter.post("/", authMiddleware, roleMiddleware(["admin", "professor"]), studentController.create);
studentRouter.put("/:id", authMiddleware, roleMiddleware(["admin", "professor"]), studentController.update);
studentRouter.delete("/:id", authMiddleware, roleMiddleware(["admin"]), studentController.delete);

export default studentRouter;
