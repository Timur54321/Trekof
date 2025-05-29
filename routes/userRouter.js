const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/createModerator', authController.signupModerator);
router.get('/logout', authController.logout);
router.get('/search/:key', authController.isLoggedIn, userController.findUsers);
router.get('/me', authController.protect, userController.getMe);
router.get('/getAuthors', userController.getAuthors);
router.get('/authors/search/:key', userController.getAuthorsBySearch);
router.get('/getModerators', userController.getModerators);
router.get('/:key', userController.getUser);
router.patch('/addChannel/:key', userController.addChannel);
router.patch('/:key', userController.updateUser);
router.delete('/:key', userController.deleteOne);

module.exports = router;