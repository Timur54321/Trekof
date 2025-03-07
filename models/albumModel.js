const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Не указано имя албома']
        },
        artist: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Не указан исполнитель альбома']
        },
        mediafiles: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'MediaFile'
            }
        ],
        releaseDate: {
            type: Date,
            default: Date.now 
        },
        cover: {
            type: String,
            required: [true, 'Не указан путь или URL к обложке албома']
        }
    }
);

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;