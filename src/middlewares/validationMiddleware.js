function validationMiddleware(req, res, next) {
  const errors = req.validationErrors?.();
  
  if (errors && errors.length > 0) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: errors.map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
}

export default validationMiddleware;
