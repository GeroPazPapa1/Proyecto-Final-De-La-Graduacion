const { User } = require("../db");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const transporter = require("../utils/transporter");
const verifyHTML = require("../utils/verifyHTML");
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

  const token = jsonwebtoken.sign({ email }, "123456", {
    expiresIn: "24h",
  });

  const subject = "Account Verification on Vehibuy.com";
  let link = `http://localhost:3001/user/verify/${token}`;
  const html = verifyHTML(link);
  transporter.sendMail(mailOptions(email, subject, html), (error, info) => {
    if (error) {
      console.error("Error to send notification:", error);
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
