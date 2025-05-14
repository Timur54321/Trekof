const mongoose = require('mongoose');

const friendLinkSchema = new mongoose.Schema(
    {
        user1: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        user2: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        status: String
    }
);

const FriendLink = mongoose.model('FriendLink', friendLinkSchema);
module.exports = FriendLink;