const { getEmailController } = require("../controllers/getEmailController");
const bcrypt = require("bcrypt");
const mailOptions = require("../utils/mailOptions");
const transporter = require("../utils/transporter");

const loginHandler = async (req, res) => {
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
    const subject = "Inicio de seión en Vehibuy.com";
    let text = `Le confirmamos un inicio de seión recientemente en Vehibuy.com con el email: ${email}`;
    transporter.sendMail(mailOptions(email, subject, text), (error, info) => {
      if (error) {
        console.error("Error al enviar la notificación por correo:", error);
      } else {
        console.log(
          "Notificación por correo electrónico enviada:",
          info.response
        );
      }
    });
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
