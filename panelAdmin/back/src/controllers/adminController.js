
// Controlador para el dashboard de admin
export const dashboardController = (req, res) => {
  res.json({
    message: "Bienvenido al panel de administración 🚀",
    user: req.user 
  });
};
