const express = require('express');
const mediafileController = require('../controllers/mediafileController');

const router = express.Router();

router.post('/', mediafileController.createOne);

module.exports = router;