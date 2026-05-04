import bcrypt from "bcrypt";
import User from "../models/User.js";
import Student from "../models/Student.js";
import handleControllerError from "../utils/handleControllerError.js";

const userController = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "email", "role", "createdAt", "updatedAt"],
        include: [{ model: Student, required: false }],
      });

      return res.json(users);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "email", "role", "createdAt", "updatedAt"],
        include: [{ model: Student, required: false }],
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario nao encontrado" });
      }

      return res.json(user);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { email, role, password } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuario nao encontrado" });
      }

      if (email && email !== user.email) {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
          return res.status(409).json({ message: "Email ja cadastrado" });
        }
      }

      const updatePayload = {
        email: email ?? user.email,
        role: role ?? user.role,
      };

      if (password) {
        updatePayload.password = await bcrypt.hash(password, 10);
      }

      await user.update(updatePayload);

      return res.json({
        message: "Usuario atualizado com sucesso",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuario nao encontrado" });
      }

      if (req.user?.id === user.id) {
        return res.status(400).json({ message: "Nao e permitido remover o proprio usuario" });
      }

      await user.destroy();

      return res.json({ message: "Usuario deletado com sucesso" });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },
};

export default userController;
