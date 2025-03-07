const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            requried: [true, 'Не указан автор']
        },
        content: {
            type: String,
            maxLength: 1500,
            default: ''
        },
        date: {
            type: Date,
            default: Date.now
        },
        likes: Number,
        dislikes: Number
    }
);


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;