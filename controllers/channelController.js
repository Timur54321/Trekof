const Channel = require("../models/channelModel");

exports.createOne = async (req, res) => {
    const channel = await Channel.create(req.body);

    res.status(204).json(channel);
};