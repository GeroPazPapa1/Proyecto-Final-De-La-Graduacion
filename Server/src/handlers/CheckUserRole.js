// const { User } = require("../db");

// exports.checkUserRole = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const userAdmin = await User.findOne({
//       where: {
//         id: id,
//       }
//     });

//     if (!userAdmin) {
//       return res.status(400).json({ message: "No se encontró el usuario para verificación!" });
//     }

//     if (userAdmin.status === "admin") {
//       next();
//     } else {
//       return res.status(403).json({ message: "No tienes permiso de administrador" })
//     }

//   } catch (error) {
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };
