const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Не указано имя плейлиста']
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Не указан исполнитель']
        },
        mediafiles: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'MediaFile'
            }
        ],
        creationDate: {
            type: Date,
            default: Date.now,
        },
        access: {
            type: String,
            enum: ['public', 'private'],
            requried: [true, 'Не указан доступ']
        }
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;