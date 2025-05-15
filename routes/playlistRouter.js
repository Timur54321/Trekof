const express = require('express');
const playlistController = require('../controllers/playlistController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', playlistController.createOne);
router.get('/myPlaylists', authController.isLoggedIn, playlistController.getMyPlaylists);
router.get('/tracks/:key', playlistController.getTracks);
router.get('/:key', playlistController.getPlaylistOfUser);
router.patch('/addTrack/:key', playlistController.addTrack);

module.exports = router;