import Class from "../models/Class.js";
import User from "../models/User.js";

const classController = {
  // Listar todas as turmas
  getAll: async (req, res) => {
    try {
      const classes = await Class.findAll({
        include: { model: User, attributes: ["id", "email"], as: "User" },
      });
      return res.json(classes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
        return res.status(404).json({ message: "Turma nao encontrada" });
      }

      return res.json(classe);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Criar turma
  create: async (req, res) => {
    try {
      const { name, description, schedule, room, professorId } = req.body;

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
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar turma
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, schedule, room, professorId } = req.body;

      const classe = await Class.findByPk(id);

      if (!classe) {
        return res.status(404).json({ message: "Turma nao encontrada" });
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
        return res.status(404).json({ message: "Turma nao encontrada" });
      }

      await classe.destroy();

      return res.json({ message: "Turma deletada com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default classController;
