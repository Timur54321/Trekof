const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.post('/', playlistController.createOne);
router.get('/:key', playlistController.getPlaylistOfUser);

module.exports = router;