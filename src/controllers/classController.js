import Class from "../models/Class.js";
import User from "../models/User.js";
import handleControllerError from "../utils/handleControllerError.js";

async function validateProfessorId(professorId) {
  if (professorId === undefined || professorId === null) {
    return null;
  }

  const professor = await User.findByPk(professorId);

  if (!professor) {
    return {
      status: 404,
      body: { message: "Professor informado não existe" },
    };
  }

  if (professor.role !== "professor") {
    return {
      status: 400,
      body: {
        message: "O professorId informado precisa pertencer a um usuário com papel professor",
      },
    };
  }

  return null;
}

const classController = {
  // Listar todas as turmas
  getAll: async (req, res) => {
    try {
      const classes = await Class.findAll({
        include: { model: User, attributes: ["id", "email"], as: "User" },
      });
      return res.json(classes);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Buscar turma por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const classe = await Class.findByPk(id, {
        include: { model: User, attributes: ["id", "email"], as: "User" },
      });

      if (!classe) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      return res.json(classe);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Criar turma
  create: async (req, res) => {
    try {
      const { name, description, schedule, room, professorId } = req.body;
      const validationError = await validateProfessorId(professorId);

      if (validationError) {
        return res.status(validationError.status).json(validationError.body);
      }

      const classe = await Class.create({
        name,
        description,
        schedule,
        room,
        professorId,
      });

      return res.status(201).json({
        message: "Turma criada com sucesso",
        class: classe,
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Atualizar turma
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, schedule, room, professorId } = req.body;
      const validationError = await validateProfessorId(professorId);

      const classe = await Class.findByPk(id);

      if (!classe) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      if (validationError) {
        return res.status(validationError.status).json(validationError.body);
      }

      await classe.update({
        name,
        description,
        schedule,
        room,
        professorId,
      });

      return res.json({
        message: "Turma atualizada com sucesso",
        class: classe,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar turma
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const classe = await Class.findByPk(id);

      if (!classe) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }

      await classe.destroy();

      return res.json({ message: "Turma deletada com sucesso" });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },
};

export default classController;
