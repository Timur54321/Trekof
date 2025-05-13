const Playlist = require('../models/playlistModel');

exports.createOne = async (req, res) => {
    const playlist = await Playlist.create(req.body);

    res.status(200).json({
        status: 'success',
        data: playlist
    });
};

exports.getPlaylistOfUser = async (req, res) => {
    const playlists = await Playlist.find({owner: req.params.key});

    res.status(200).json({
        status: 'success',
        data: playlists
    });
};


