function mapSequelizeErrors(error) {
  if (!error?.name) {
    return null;
  }

  if (error.name === "SequelizeValidationError") {
    return {
      status: 400,
      body: {
        message: "Erro de validacao",
        error: error.message,
        details: error.errors?.map((item) => ({
          field: item.path,
          message: item.message,
          value: item.value,
        })),
      },
    };
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return {
      status: 409,
      body: {
        message: "Registro duplicado",
        error: error.message,
        details: error.errors?.map((item) => ({
          field: item.path,
          message: item.message,
          value: item.value,
        })),
      },
    };
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    return {
      status: 400,
      body: {
        message: "Referencia invalida",
        error: error.message,
        field: error.index || error.fields || null,
      },
    };
  }

  return null;
}

function handleControllerError(res, error) {
  const mappedError = mapSequelizeErrors(error);

  if (mappedError) {
    return res.status(mappedError.status).json(mappedError.body);
  }

  return res.status(500).json({ error: error.message });
}

export default handleControllerError;
