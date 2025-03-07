const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        photo: String,
        content: {
            type: String,
            maxlength: 4000
        },
        comments: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Comment'
            }
        ],
        likes: Number
    }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;