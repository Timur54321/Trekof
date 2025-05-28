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
        cover: {
            type: String,
            required: [true, 'Не указан путь или URL к обложке албома']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }    
);

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;