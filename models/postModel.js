const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        photoKey: String,
        header: String,
        content: {
            type: String,
            maxlength: 4000
        },
        channel: {
            type: mongoose.Schema.ObjectId,
            ref: 'Channel'
        }
    }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;