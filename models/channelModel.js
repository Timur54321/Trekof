const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
    {
        followers: Number,
        name: String
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

channelSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'channel'
});

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;

