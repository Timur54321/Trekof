const Playlist = require('../models/playlistModel');

exports.createOne = async (req, res) => {
    const playlist = await Playlist.create(req.body);

    res.status(200).json(playlist);
};

exports.getPlaylistOfUser = async (req, res) => {
    const playlists = await Playlist.find({owner: req.params.key});

    res.status(200).json({
        status: 'success',
        data: playlists
    });
};

exports.addTrack = async (req, res) => {
    const playlistId = req.params.key;

    const playlists = await Playlist.findByIdAndUpdate(
        playlistId, // ID плейлиста
        { $push: { mediafiles: req.body.audioFileId } }, // audiofileId - ObjectId аудиофайла
        { new: true } // Вернуть обновленный документ
    );
    
    res.status(200).json(playlists);
};

exports.getTracks = async (req, res) => {
    const playlist = await Playlist.findById(req.params.key).populate({
        path: 'mediafiles',
        populate: { // Вложенный populate для author
          path: 'artist',
          model: 'User'
        }
      });

    res.status(200).json(playlist.mediafiles);
};

exports.getMyPlaylists = async (req, res) => {
    const playlists = await Playlist.find({owner: res.locals.user});

    res.status(200).json(playlists);
}

