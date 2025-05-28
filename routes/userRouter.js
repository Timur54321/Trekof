const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/search/:key', authController.isLoggedIn, userController.findUsers);
router.get('/me', authController.protect, userController.getMe);
router.get('/getAuthors', userController.getAuthors);
router.get('/authors/search/:key', userController.getAuthorsBySearch);
router.get('/:key', userController.getUser);
router.patch('/addChannel/:key', userController.addChannel);
router.patch('/:key', userController.updateUser);

module.exports = router;