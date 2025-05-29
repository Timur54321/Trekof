const mongoose = require('mongoose');

const blockRequestSchema = new mongoose.Schema({
        commentId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        },
        status: {
            type: String,
            enum: ['moderation', 'admin'],
            default: 'moderation'
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
});

const BlockRequest = mongoose.model('BlockRequest', blockRequestSchema);
module.exports = BlockRequest;

