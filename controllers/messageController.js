const Message = require("../models/messageModel")

exports.createOne = async (req, res) => {
    const message = await Message.create({
        author: res.locals.user,
        content: req.body.content,
        type: req.body.type,
        chat: req.body.chat,
        mediafile: req.body.mediafile
    });

    res.status(204).json(message);
}