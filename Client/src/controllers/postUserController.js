const { User } = require("../db");
const bcrypt = require("bcrypt");

const postUserController = async (dataUserBody) => {

   const { name, lastName, country, age, tel, email, password, status } = dataUserBody;

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
    password: hashedPassword
  };
  const userCreate = await User.create(newUser);
  return userCreate;
}

module.exports = {
  postUserController,
}