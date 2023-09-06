exports.checkUserRole = (type) => {
    return (req, res, next) => {
      // Verifica si el usuario tiene el rol adecuado
      if (req.user && req.user.userType === type) {
        next(); // Continúa con la siguiente función si es un administrador
      } else {
        res.status(403).json({ message: "Acceso no autorizado" }); // Acceso no autorizado
      }
    };
  };
