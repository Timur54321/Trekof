const Comment = require("../models/commentModel")

exports.createOne = async (req, res) => {
    const comment = await Comment.create(req.body);

    res.status(204).json(comment);
};

exports.getComments = async (req, res) => {
    const comments = await Comment.find({post: req.params.post}).populate('author');

    res.status(200).json(comments);
}