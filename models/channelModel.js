const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Не указано имя канала']
        },
        followers: Number,
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Не указан автор канала']
        },
        posts: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Post'
            }
        ]
    }
);

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;

