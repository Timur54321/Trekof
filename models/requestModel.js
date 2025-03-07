const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
    {
        mediaFile: {
            type: mongoose.Schema.ObjectId,
            ref: 'MediaFile',
            required: [true, 'Не указан медиафайл']
        },
        album: {
            type: mongoose.Schema.ObjectId,
            ref: 'Album'
        },
        artist: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Не указан исполнитель']
        },
        status: {
            type: String,
            enum: ['На рассмотрении', 'Одобрено', 'Отклонено']
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);


const Request = mongoose.model('Request', requestSchema);
module.exports = Request;