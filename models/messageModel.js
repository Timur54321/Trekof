const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Не указан автор сообщения']
        },
        content: String,
        type: {
            type: String,
            enum: ['Text', 'Mediafile']
        },
        mediafile: {
            type: mongoose.Schema.ObjectId,
            ref: 'MediaFile'
        },
        chat: {
            type: mongoose.Schema.ObjectId,
            ref: 'Chat'
        }
    }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;