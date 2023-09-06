const { getEmailController } = require("../controllers/getEmailController");
const bcrypt = require("bcrypt");

const loginHandler = async (req, res) => {
  const saltRounds = 10;

  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Faltan datos");
    const user = await getEmailController(email);
    const userId = user.id;
    if (!user) return res.status(404).send("Usuario no encontrado");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).send("Contraseña incorrecta");
    }
    if (user.status == "admin")
      return res.status(200).json({ access: true, type: "admin", id: userId });
    if (user.status == "user")
      return res.status(200).json({ access: true, type: "user", id: userId });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  loginHandler,
};
