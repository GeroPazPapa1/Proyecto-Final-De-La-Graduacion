const axios = require("axios");
const { Brand } = require("../db");

const getAllBrand = async (req, res) => {
    try {
        const { data } = await axios.get("http://localhost:3001/car/search");

        const carBrands = data.map((car) => car.brand);

        // Eliminar marcas duplicadas utilizando un conjunto (Set)
        const uniqueCarsBrand = [...new Set(carBrands)];

        return res.status(200).json(uniqueCarsBrand);
    } catch (error) {
        return res
            .status(500)
            .json({ error: "OcurriÃ³ un error al obtener y procesar los datos." });
    }
};

module.exports = { getAllBrand };