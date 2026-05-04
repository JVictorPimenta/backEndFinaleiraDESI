import Grade from "../models/Grade.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import Discipline from "../models/Discipline.js";
import handleControllerError from "../utils/handleControllerError.js";

async function validateGradePayload({ studentId, disciplineId }) {
  const student = await Student.findByPk(studentId);

  if (!student) {
    return {
      status: 404,
      body: { message: "Aluno informado nao existe" },
    };
  }

  const discipline = await Discipline.findByPk(disciplineId);

  if (!discipline) {
    return {
      status: 404,
      body: { message: "Disciplina informada nao existe" },
    };
  }

  return null;
}

const gradeController = {
  // Listar todas as notas
  getAll: async (req, res) => {
    try {
      const grades = await Grade.findAll({
        include: [
          { model: Student },
          { model: Discipline, include: [{ model: Class }] },
        ],
      });
      return res.json(grades);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Buscar nota por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const grade = await Grade.findByPk(id, {
        include: [
          { model: Student },
          { model: Discipline, include: [{ model: Class }] },
        ],
      });

      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      return res.json(grade);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Criar nota
  create: async (req, res) => {
    try {
      const { studentId, disciplineId, score, semester } = req.body;
      const validationError = await validateGradePayload({ studentId, disciplineId });

      if (validationError) {
        return res.status(validationError.status).json(validationError.body);
      }

      const grade = await Grade.create({
        studentId,
        disciplineId,
        score,
        semester,
      });

      return res.status(201).json({
        message: "Nota criada com sucesso",
        grade,
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Atualizar nota
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { score, semester, disciplineId } = req.body;

      const grade = await Grade.findByPk(id);

      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      const nextDisciplineId = disciplineId ?? grade.disciplineId;
      const validationError = await validateGradePayload({
        studentId: grade.studentId,
        disciplineId: nextDisciplineId,
      });

      if (validationError) {
        return res.status(validationError.status).json(validationError.body);
      }

      await grade.update({ score, semester, disciplineId: nextDisciplineId });

      return res.json({
        message: "Nota atualizada com sucesso",
        grade,
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Deletar nota
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const grade = await Grade.findByPk(id);

      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      await grade.destroy();

      return res.json({ message: "Nota deletada com sucesso" });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },
};

export default gradeController;
