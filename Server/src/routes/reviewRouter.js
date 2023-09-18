const { Router } = require("express");
const {postReview, getReviewById, deleteReview, updateReview} = require('../controllers/ReviewController');

const reviewRouter = Router();

reviewRouter.post('/', postReview);
reviewRouter.get('/:id', getReviewById)
reviewRouter.delete('/:id', deleteReview)
reviewRouter.put('/', updateReview)

module.exports = reviewRouter