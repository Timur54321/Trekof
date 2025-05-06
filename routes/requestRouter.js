const express = require('express');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.post('/', requestController.createOne);

module.exports = router;