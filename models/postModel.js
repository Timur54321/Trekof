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
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;