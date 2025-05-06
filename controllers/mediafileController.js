const MediaFile = require("../models/mediaFileModel")

exports.createOne = async (req, res) => {
    const mediafile = await MediaFile.create(req.body);

    res.status(201).json({
        status: 'success',
        data: mediafile
    });
};