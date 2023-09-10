const { putUserController } = require("../controllers/putUserController");

const putUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, age, country, email, password, image, tel } =
      req.body;
    const user = await putUserController(id);
    if (!user) return res.status(404).send("User not found");
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;
    if (country) user.country = country;
    if (email) user.email = email;
    if (password) user.password = password;
    if (image) user.image = image;
    if (tel) user.tel = tel;
    await user.save();
    return res.status(200).json("user updated successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { 
  putUserHandler,
 };