const express = require('express');
const router = express.Router();
const reviewController = require('../../../controllers/review');

router.post('/add',reviewController.addReview);
router.get('/:id',reviewController.getReviews);

module.exports = router;