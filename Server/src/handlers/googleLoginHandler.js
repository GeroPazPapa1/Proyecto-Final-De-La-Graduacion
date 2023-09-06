const { compareOrCreateUser } = require("../controllers/compareOrCreateUser");
const { getIpUserController } = require("../controllers/getIpUserController");
const admin = require("firebase-admin");

const googleLoginHandler = async (req, res) => {
  try {
    const token = req.body.token;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const clientIp = req.clientIp;
    const ipinfoResponse = await getIpUserController(clientIp);
    let { country } = ipinfoResponse.data;
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name;
    const image = decodedToken.picture;
    const tel = decodedToken.phone_number;
    const age = 18;
    const lastName = decodedToken.name;
    const status = "user";
    if (country == undefined) {
      country = "undefined";
    }
    const user = await compareOrCreateUser({
      email,
      uid,
      name,
      image,
      tel,
      age,
      lastName,
      status,
      country,
    });
    const userId = user[0].dataValues.id;
    if (user[0].dataValues.password != uid) {
      return res.status(409).send({
        access: false,
        message: "Error: Account already previously registered.",
      });
    }
    console.log(user);
    return res.status(200).json({ access: true, type: "user", id: userId });
  } catch (error) {
    res.status(500).json({ error: "Error al verificar el token" });
  }
};
module.exports = { googleLoginHandler };
