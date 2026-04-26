import Student from "../models/Student.js";
import User from "../models/User.js";

const studentController = {
  // Listar todos os alunos
  getAll: async (req, res) => {
    try {
      const students = await Student.findAll({
        include: { model: User, attributes: ["id", "email", "role"] },
      });
      return res.json(students);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Buscar aluno por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findByPk(id, {
        include: { model: User, attributes: ["id", "email", "role"] },
      });

      if (!student) {
        return res.status(404).json({ message: "Aluno nao encontrado" });
      }

      return res.json(student);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Criar aluno
  create: async (req, res) => {
    try {
      const { name, registration, cpf, phone, address, userId } = req.body;

      const student = await Student.create({
        name,
        registration,
        cpf,
        phone,
        address,
        userId,
      });

      return res.status(201).json({
        message: "Aluno criado com sucesso",
        student,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Atualizar aluno
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, registration, cpf, phone, address } = req.body;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ message: "Aluno nao encontrado" });
      }

      await student.update({
        name,
        registration,
        cpf,
        phone,
        address,
      });

      return res.json({
        message: "Aluno atualizado com sucesso",
        student,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Deletar aluno
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ message: "Aluno nao encontrado" });
      }

      await student.destroy();

      return res.json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default studentController;
