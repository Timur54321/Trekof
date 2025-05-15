const express = require('express');
const channelController = require('../controllers/channelController');

const router = express.Router();

router.post('/', channelController.createOne);

module.exports = router;