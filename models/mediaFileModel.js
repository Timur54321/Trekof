const mongoose = require('mongoose');

const mediaFileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Не указано имя файла']
        },
        artist: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Не указан исполнитель']
        },
        audio: {
            type: String,
            required: [true, 'Не указан путь или URL к медиафайлу']
        },
        cover: {
            type: String,
            required: [true, 'Не указано имя медиафайла']
        },
        snippetStartTime: String,
        text: String,
        type: String
    }
);

const MediaFile = mongoose.model('MediaFile', mediaFileSchema);
module.exports = MediaFile;