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
        audioKey: {
            type: String,
            required: [true, 'Не указан путь или URL к медиафайлу']
        },
        coverKey: {
            type: String,
            required: [true, 'Не указано имя медиафайла']
        },
        status: String,
        snippetStartTime: String,
        text: String
    }
);

const MediaFile = mongoose.model('MediaFile', mediaFileSchema);
module.exports = MediaFile;