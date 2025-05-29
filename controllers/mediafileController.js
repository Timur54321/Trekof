const Album = require("../models/albumModel");
const MediaFile = require("../models/mediaFileModel");
const Playlist = require('../models/playlistModel');

exports.createOne = async (req, res) => {
    const mediafile = await MediaFile.create(req.body);

    res.status(201).json({
        status: 'success',
        data: mediafile
    });
};

exports.updateOne = async (req, res) => {
    const mediafile = await MediaFile.findByIdAndUpdate(req.params.key, req.body);

    res.status(201).json({
        status: 'success',
        data: mediafile
    });
};

exports.getArtistTracks = async (req, res) => {
    const tracks = await MediaFile.find({
        artist: req.params.key,
        status: 'approved'
    }).populate('artist');

    res.status(200).json({
        status: 'success',
        data: tracks
    });
};

exports.getPlaylistTracks = async (req, res) => {
    const playlist = await Playlist
    .findById(req.params.key)
    .populate({
        path: 'mediafiles',
        populate: { path: 'artist' } 
    });

    const mediafiles = playlist?.mediafiles || [];

    res.status(200).json(mediafiles);
};

exports.getTracksBySearch = async (req, res) => {
    try {
        const key = req.params.key;
        const tracks = await MediaFile.find({ 
            name: { $regex: key, $options: 'i' } 
        }).populate('artist');
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAlbumTracks = async (req, res) => {
    const album = await Album.findById(req.params.key)
    .populate({
        path: 'mediafiles',
        populate: {
        path: 'artist'  // Это поле внутри каждого mediafile
        }
    });

    res.status(200).json(album.mediafiles);
};

exports.updateListens = async (req, res) => {
    await MediaFile.findByIdAndUpdate(
        req.params.key, // ID медиафайла
        { $inc: { listens: 1 } }, // Увеличить likes на 1
        { new: true } // Вернуть обновленный документ
    );

    res.status(200).json('success');
};

exports.getRandomTracks = async (req, res) => {
    const tracks = await MediaFile.aggregate([
    { $sample: { size: 4 } },
    { $lookup: {
        from: 'users',
        localField: 'artist',
        foreignField: '_id',
        as: 'authorInfo'
    }},
    { $unwind: '$authorInfo' }
  ]);

    res.status(200).json(tracks);
}
