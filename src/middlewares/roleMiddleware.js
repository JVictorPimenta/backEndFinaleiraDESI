function roleMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Usuario nao autenticado" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acesso negado. Permissao insuficiente" });
    }

    next();
  };
}

export default roleMiddleware;
