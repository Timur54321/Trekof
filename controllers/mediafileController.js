const MediaFile = require("../models/mediaFileModel")

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
    const tracks = await MediaFile.find({artist: req.params.key}).populate('artist');

    res.status(200).json({
        status: 'success',
        data: tracks
    });
};

exports.getPlaylistTracks = async (req, res) => {
    const medafiles = await MediaFile.find({playlist: req.params.key}).populate('artist');

    res.status(200).json({
        status: 'success',
        data: medafiles
    });
};
