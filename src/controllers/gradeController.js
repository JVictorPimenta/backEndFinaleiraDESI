import Grade from "../models/Grade.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import handleControllerError from "../utils/handleControllerError.js";

const gradeController = {
  // Listar todas as notas
  getAll: async (req, res) => {
    try {
      const grades = await Grade.findAll({
        include: [
          { model: Student },
          { model: Class },
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
          { model: Class },
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
      const { studentId, classId, score, semester } = req.body;

      const grade = await Grade.create({
        studentId,
        classId,
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
      const { score, semester } = req.body;

      const grade = await Grade.findByPk(id);

      if (!grade) {
        return res.status(404).json({ message: "Nota não encontrada" });
      }

      await grade.update({ score, semester });

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
