const Channel = require("../models/channelModel");

exports.createOne = async (req, res) => {
    const channel = await Channel.create(req.body);

    res.status(201).json(channel);
};

exports.getMyChannels = async (req, res) => {
    let channels = [];
    let followedChannels = res.locals.user.followedChannels;
    for (let i = 0; i < followedChannels.length; i++) {
        let currentChannel = await Channel.findById(followedChannels[i]);
        if (currentChannel) channels.push(currentChannel);
    }

    res.status(200).json(channels);
}
