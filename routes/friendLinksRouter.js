const express = require('express');
const friendLinksController = require('../controllers/friendLinksController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.isLoggedIn, friendLinksController.createOne);
router.delete('/:key', friendLinksController.deleteOne);
router.patch('/:key', friendLinksController.updateOne);
router.get('/myFriends', authController.isLoggedIn, friendLinksController.getMyFriends);

module.exports = router;