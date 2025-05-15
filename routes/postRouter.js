const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();
router.post('/', postController.createOne);
router.get('/:key', postController.getPosts);

module.exports = router;