import express from "express";
import enrollmentController from "../controllers/enrollmentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const enrollmentRouter = express.Router();

// Rotas públicas (para login)
enrollmentRouter.get("/", authMiddleware, enrollmentController.getAll);
enrollmentRouter.get("/:id", authMiddleware, enrollmentController.getById);

// Rotas protegidas (apenas admin gerencia matriculas)
enrollmentRouter.post("/", authMiddleware, roleMiddleware(["admin"]), enrollmentController.create);
enrollmentRouter.put("/:id", authMiddleware, roleMiddleware(["admin"]), enrollmentController.update);
enrollmentRouter.delete("/:id", authMiddleware, roleMiddleware(["admin"]), enrollmentController.delete);

export default enrollmentRouter;
