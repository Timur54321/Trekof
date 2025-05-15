const Post = require("../models/postModel")

exports.createOne = async (req, res) => {
    const post = await Post.create(req.body);

    res.status(204).json(post);
};

exports.getPosts = async (req, res) => {
    const posts = await Post.find({channel: req.params.key});

    res.status(200).json(posts);
}
