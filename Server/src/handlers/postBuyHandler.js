const { postBuyController } = require("../controllers/postBuyController");

const postBuyHandler = async (req, res) => {
  try {
    const { userId, carsId, description, price } = req.body;
    const carsIdArray = JSON.parse(carsId);
    const amount = carsIdArray.length;
    console.log(description);
    const descriptionArray = JSON.parse(description);
    const totalDescription = descriptionArray.join(", ");
    const finalDescription = `Quantity total: ${amount}, Purshased items: ${totalDescription}`;
    postBuyController({ userId, carsId, amount, finalDescription, price });
    return res.status(200).json({ status: "Purchase stored successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postBuyHandler,
};
