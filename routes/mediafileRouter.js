const express = require('express');
const mediafileController = require('../controllers/mediafileController');

const router = express.Router();

router.post('/', mediafileController.createOne);

router.patch('/:key', mediafileController.updateOne);
router.get('/playlist/:key', mediafileController.getPlaylistTracks);
router.get('/:key', mediafileController.getArtistTracks);
router.get('/search/:key', mediafileController.getTracksBySearch);
router.get('/album/:key', mediafileController.getAlbumTracks);
router.patch('/listen/:key', mediafileController.updateListens);

module.exports = router;