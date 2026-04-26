function errorMiddleware(error, req, res, next) {
  console.error("Erro:", error);

  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }

  res.status(500).json({
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
}

export default errorMiddleware;
