const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            default: '',
            maxlength: 2000
        }
    }
);

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;