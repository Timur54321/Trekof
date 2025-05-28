const Playlist = require('../models/playlistModel');
const MediaFile = require('../models/mediaFileModel');

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

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId, // ID плейлиста
        { $push: { mediafiles: req.body.audioFileId } }, // audiofileId - ObjectId аудиофайла
        { new: true } // Вернуть обновленный документ
    );

    if (playlist.type === "Favourites") {
        await MediaFile.findByIdAndUpdate(
            req.body.audioFileId, // ID медиафайла
            { $inc: { likes: 1 } } // Увеличить likes на 1
        );
    }
    
    res.status(200).json(playlist);
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

