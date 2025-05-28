const express = require('express');
const albumController = require('../controllers/albumController');
const authController = require('../controllers/authController');

const router  = express.Router();

router.post('/', authController.isLoggedIn, albumController.createOne);
router.get('/artist/:key', albumController.getArtistAlbums);
router.delete('/:key', albumController.deleteOne);

module.exports = router;