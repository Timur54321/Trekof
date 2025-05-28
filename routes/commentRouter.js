const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.post('/', commentController.createOne);
router.get('/:post', commentController.getComments);

module.exports = router;