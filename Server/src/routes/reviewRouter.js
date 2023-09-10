const { Router } = require("express");
const {postReview} = require('../controllers/ReviewController');

const reviewRouter = Router();

reviewRouter.post('/', postReview);

module.exports = reviewRouter