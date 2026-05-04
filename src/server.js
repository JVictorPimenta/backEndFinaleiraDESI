import "./config/loadEnv.js";
import express, { json } from "express";
import cors from "cors";
import corsOptions from "./config/cors.js";
import { connect } from "./database/sqlConnection.js";
import authRouter from "./routes/authRouter.js";
import studentRouter from "./routes/studentRouter.js";
import classRouter from "./routes/classRouter.js";
import disciplineRouter from "./routes/disciplineRouter.js";
import enrollmentRouter from "./routes/enrollmentRouter.js";
import gradeRouter from "./routes/gradeRouter.js";
import userRouter from "./routes/userRouter.js";
import ensureDefaultAdmin from "./bootstrap/ensureDefaultAdmin.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import "./models/User.js";
import "./models/Student.js";
import "./models/Class.js";
import "./models/Discipline.js";
import "./models/Enrollment.js";
import "./models/Grade.js";

const PORT = process.env.PORT || 3000;
const app = express();

// Luiz Esteve Aqui
app.use(cors(corsOptions));
app.use(json());

// Rotas
app.use("/auth", authRouter);
app.use("/students", studentRouter);
app.use("/users", userRouter);
app.use("/classes", classRouter);
app.use("/disciplines", disciplineRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/grades", gradeRouter);

app.get("/", (req, res) => {
  res.send("<h1>Servidor Sistema Escolar - finaleiraDESI :D</h1>");
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

async function startServer() {
  try {
    await connect();
    await ensureDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

startServer();
