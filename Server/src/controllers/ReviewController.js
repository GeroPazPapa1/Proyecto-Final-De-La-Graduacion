const { Reviews } = require('../db')

const postReview = async (req, res) => {
    const {rating, tittle, review, carId, userId} = req.body
    try {
         await Reviews.create({
                rating: rating,
                tittle: tittle,
                review: review,
                carId: carId,
                userId: userId
        })
        
        res.status(200).json({message: 'se creo con exito'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    postReview,
}