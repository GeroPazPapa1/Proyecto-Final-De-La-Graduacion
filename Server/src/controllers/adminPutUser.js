const { User } = require("../db");

const adminInputUser = async (req, res) => {
  const { id } = req.params;
  const { ban, status } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(403).json({ message: "No se encontró el usuario" });
    }

    // Actualiza el valor de 'ban' solo si está presente en la solicitud
    if (ban !== undefined) {
      user.ban = ban;
    }

    // Actualiza el valor de 'status' solo si está presente en la solicitud
    if (status !== undefined) {
      user.status = status;
    }

    // Guarda los cambios en la base de datos
    await user.save();

    const allUsers = await User.findAll();

    return res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { adminInputUser };
