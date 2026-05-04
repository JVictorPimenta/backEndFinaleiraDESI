import Discipline from "../models/Discipline.js";
import Class from "../models/Class.js";
import handleControllerError from "../utils/handleControllerError.js";

async function validateClassId(classId) {
  if (classId === undefined || classId === null) {
    return {
      status: 400,
      body: { message: "classId e obrigatorio" },
    };
  }

  const classe = await Class.findByPk(classId);

  if (!classe) {
    return {
      status: 404,
      body: { message: "Turma informada nao existe" },
    };
  }

  return null;
}

const disciplineController = {
  getAll: async (req, res) => {
    try {
      const disciplines = await Discipline.findAll({
        include: [{ model: Class }],
      });

      return res.json(disciplines);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      const discipline = await Discipline.findByPk(req.params.id, {
        include: [{ model: Class }],
      });

      if (!discipline) {
        return res.status(404).json({ message: "Disciplina nao encontrada" });
      }

      return res.json(discipline);
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const { name, description, classId } = req.body;
      const validationError = await validateClassId(classId);

      if (validationError) {
        return res.status(validationError.status).json(validationError.body);
      }

      const discipline = await Discipline.create({
        name,
        description,
        classId,
      });

      return res.status(201).json({
        message: "Disciplina criada com sucesso",
        discipline,
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const { name, description, classId } = req.body;
      const discipline = await Discipline.findByPk(req.params.id);

      if (!discipline) {
        return res.status(404).json({ message: "Disciplina nao encontrada" });
      }

      const nextClassId = classId ?? discipline.classId;
      const validationError = await validateClassId(nextClassId);

      if (validationError) {
        return res.status(validationError.status).json(validationError.body);
      }

      await discipline.update({
        name,
        description,
        classId: nextClassId,
      });

      return res.json({
        message: "Disciplina atualizada com sucesso",
        discipline,
      });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },

  delete: async (req, res) => {
    try {
      const discipline = await Discipline.findByPk(req.params.id);

      if (!discipline) {
        return res.status(404).json({ message: "Disciplina nao encontrada" });
      }

      await discipline.destroy();

      return res.json({ message: "Disciplina deletada com sucesso" });
    } catch (error) {
      return handleControllerError(res, error);
    }
  },
};

export default disciplineController;
