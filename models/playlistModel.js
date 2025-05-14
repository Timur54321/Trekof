const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Не указано имя плейлиста']
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        creationDate: {
            type: Date,
            default: Date.now,
        },
        type: String,
        mediafiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaFile' }]
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;