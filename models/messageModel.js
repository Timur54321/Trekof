const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Не указан автор сообщения']
        },
        content: {
            type: mongoose.Schema.ObjectId,
            ref: 'Content',
            required: [true, 'Не указана ссылка на контент']
        },
        type: {
            type: String,
            enum: ['Text', 'Mediafile']
        },
        mediafile: {
            type: mongoose.Schema.ObjectId,
            ref: 'MediaFile'
        }
    }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;