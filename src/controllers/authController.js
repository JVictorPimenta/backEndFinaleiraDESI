import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import handleControllerError from "../utils/handleControllerError.js";

const SECRET = process.env.JWT_SECRET || "segredo";

function resolveUserRole(email) {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.toLowerCase()) ? "admin" : "aluno";
}

async function createUser({ email, password, role }) {
  const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return { error: { status: 409, body: { message: "Email já cadastrado" } } };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword,
        role,
      });

  return {
    user,
    body: {
        message: "Usuário criado",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
    },
  };
}

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const role = resolveUserRole(email);
      const result = await createUser({ email, password, role });

      if (result.error) {
        return res.status(result.error.status).json(result.error.body);
      }

      return res.status(201).json(result.body);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  registerProfessor: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await createUser({ email, password, role: "professor" });

      if (result.error) {
        return res.status(result.error.status).json(result.error.body);
      }

      return res.status(201).json({
        message: "Professor criado com sucesso",
        user: result.body.user,
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Senha invalida" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login sucesso",
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },
};

export default authController;
