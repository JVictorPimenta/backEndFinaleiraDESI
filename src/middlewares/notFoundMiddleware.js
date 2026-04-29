function notFoundMiddleware(req, res) {
  res.status(404).json({
    message: "Rota não encontrada",
    path: req.originalUrl,
  });
}

export default notFoundMiddleware;
