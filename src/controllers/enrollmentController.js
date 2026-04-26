import Enrollment from "../models/Enrollment.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";

const enrollmentController = {
  // Listar todas as inscrições
  getAll: async (req, res) => {
    try {
      const enrollments = await Enrollment.findAll({
        include: [
          { model: Student },
          { model: Class },
        ],
      });
      return res.json(enrollments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Buscar inscrição por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const enrollment = await Enrollment.findByPk(id, {
        include: [
          { model: Student },
          { model: Class },
        ],
      });

      if (!enrollment) {
        return res.status(404).json({ message: "Inscricao nao encontrada" });
      }

      return res.json(enrollment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Criar inscrição
  create: async (req, res) => {
    try {
      const { studentId, classId, status } = req.body;

      const enrollment = await Enrollment.create({
        studentId,
        classId,
        status,
      });

      return res.status(201).json({
        message: "Inscricao criada com sucesso",
        enrollment,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar inscrição
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const enrollment = await Enrollment.findByPk(id);

      if (!enrollment) {
        return res.status(404).json({ message: "Inscricao nao encontrada" });
      }

      await enrollment.update({ status });

      return res.json({
        message: "Inscricao atualizada com sucesso",
        enrollment,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar inscrição
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const enrollment = await Enrollment.findByPk(id);

      if (!enrollment) {
        return res.status(404).json({ message: "Inscricao nao encontrada" });
      }

      await enrollment.destroy();

      return res.json({ message: "Inscricao deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default enrollmentController;
