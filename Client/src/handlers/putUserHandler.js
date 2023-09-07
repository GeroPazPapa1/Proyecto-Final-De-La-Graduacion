const { putUserController } = require("../controllers/putUserController");

const putUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, age, country, email, password, image, tel } =
      req.body;
    const user = await putUserController(id);
    if (!user) return res.status(404).send("User not found");
    user.name = name;
    user.lastName = lastName;
    user.age = age;
    user.country = country;
    user.email = email;
    user.password = password;
    user.image = image;
    user.tel = tel;
    await user.save();
    return res.status(200).json("user updated successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { 
  putUserHandler,
 };