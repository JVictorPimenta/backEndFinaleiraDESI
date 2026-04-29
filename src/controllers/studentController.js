import Student from "../models/Student.js";
import User from "../models/User.js";
import handleControllerError from "../utils/handleControllerError.js";

const studentController = {
  // Listar todos os alunos
  getAll: async (req, res) => {
    try {
      const students = await Student.findAll({
        include: { model: User, attributes: ["id", "email", "role"] },
      });
      return res.json(students);
    } catch (error) {
      return handleControllerError(res, error);
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
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      return res.json(student);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  // Criar aluno
  create: async (req, res) => {
    try {
      const { name, registration, cpf, phone, address, userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "userId e obrigatorio" });
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário informado não existe" });
      }

      if (user.role !== "aluno") {
        return res.status(400).json({
          message: "O userId informado precisa pertencer a um usuário com papel aluno",
        });
      }

      const existingStudentForUser = await Student.findOne({ where: { userId } });

      if (existingStudentForUser) {
        return res.status(409).json({
          message: "Este usuário já está vinculado a um aluno",
        });
      }

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
      return handleControllerError(res, error);
    }
  },

  // Atualizar aluno
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, registration, cpf, phone, address } = req.body;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
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
      return handleControllerError(res, error);
    }
  },

  // Deletar aluno
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }

      await student.destroy();

      return res.json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },
};

export default studentController;
