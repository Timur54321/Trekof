const express = require('express');
const htmlController = require('../controllers/htmlController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/authorPage', authController.protect, htmlController.getAuthorPage);
router.get('/artistPage', htmlController.getArtistPage);
router.get('/userPage', htmlController.getUserPage);
router.get('/friendsPage', htmlController.getFriendsPage);
router.get('/messenger', htmlController.getMessengerPage);
router.get('/mainPage', htmlController.getMainPage);
router.get('/leftSection', htmlController.getLeftSection);

module.exports = router;