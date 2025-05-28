const express = require('express');
const channelController = require('../controllers/channelController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', channelController.createOne);
router.get('/myFollowedChannels', authController.isLoggedIn, channelController.getMyChannels);

module.exports = router;