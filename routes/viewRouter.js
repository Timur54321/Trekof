const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getMainPage);
router.get('/moderator', viewController.getModeratorPage);

module.exports = router;