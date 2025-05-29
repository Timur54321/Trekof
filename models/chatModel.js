const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        user1: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        user2: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['updated', 'still']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

chatSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chat'
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;

