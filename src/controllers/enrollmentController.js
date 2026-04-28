import Enrollment from "../models/Enrollment.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import handleControllerError from "../utils/handleControllerError.js";

async function validateEnrollmentPayload({ studentId, classId }) {
  if (studentId === undefined || studentId === null) {
    return {
      status: 400,
      body: { message: "studentId e obrigatorio" },
    };
  }

  if (classId === undefined || classId === null) {
    return {
      status: 400,
      body: { message: "classId e obrigatorio" },
    };
  }

  const student = await Student.findByPk(studentId);

  if (!student) {
    return {
      status: 404,
      body: { message: "Aluno informado nao existe" },
    };
  }

  const classe = await Class.findByPk(classId);

  if (!classe) {
    return {
      status: 404,
      body: { message: "Turma informada nao existe" },
    };
  }

  const existingEnrollment = await Enrollment.findOne({
    where: { studentId, classId },
  });

  if (existingEnrollment) {
    return {
      status: 409,
      body: { message: "Este aluno ja esta matriculado nesta turma" },
    };
  }

  return null;
}

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
      return handleControllerError(res, error);
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
      return handleControllerError(res, error);
    }
  },

  // Criar inscrição
  create: async (req, res) => {
    try {
      const { studentId, classId, status } = req.body;
      const validationError = await validateEnrollmentPayload({ studentId, classId });

      if (validationError) {
        return res.status(validationError.status).json(validationError.body);
      }

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
      return handleControllerError(res, error);
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
      return handleControllerError(res, error);
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
      return handleControllerError(res, error);
    }
  },
};

export default enrollmentController;
