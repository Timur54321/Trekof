const express = require('express');
const chatController = require('../controllers/chatController.js');
const authController = require('../controllers/authController.js');

const router = express.Router();
router.get('/myChats', chatController.getMyChats);
router.get('/loadChat/:key', authController.isLoggedIn, chatController.loadChat);
router.get('/:key', chatController.getChat);

module.exports = router;