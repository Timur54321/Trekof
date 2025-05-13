const express = require('express');
const mediafileController = require('../controllers/mediafileController');

const router = express.Router();

router.post('/', mediafileController.createOne);

router.patch('/:key', mediafileController.updateOne);
router.get('/playlist/:key', mediafileController.getPlaylistTracks);
router.get('/:key', mediafileController.getArtistTracks);

module.exports = router;