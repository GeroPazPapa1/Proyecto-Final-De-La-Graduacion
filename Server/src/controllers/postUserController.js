const { User } = require("../db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const transporter = require("../utils/transporter");
const getEmailController = require("./getEmailController");
const mailOptions = require("../utils/mailOptions");

const postUserController = async (dataUserBody) => {
  const { name, lastName, country, age, tel, email, password, status } =
    dataUserBody;

  // Hash password bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = {
    name,
    lastName,
    country,
    age,
    tel,
    status,
    email,
    password: hashedPassword,
  };
  /*  const verifyUser = getEmailController(newUser.email);
  const userId = verifyUser.id; */
  const token = jsonwebtoken.sign({ email }, "123456", {
    expiresIn: "24h",
  });

  const subject = "Account Verification on Vehibuy.com";
  let text = `Click on the following link to verify your email and start shopping on Vehibuy.com: http://localhost:3001/user/verify/${token}`;
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
  const userCreate = await User.create(newUser);
  return userCreate;
};

module.exports = {
  postUserController,
};
