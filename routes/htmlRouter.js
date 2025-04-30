const express = require('express');
const htmlController = require('../controllers/htmlController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/authorPage', authController.protect, htmlController.getAuthorPage);

module.exports = router;