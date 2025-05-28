const MediaFile = require("../models/mediaFileModel");
const Message = require("../models/messageModel");

exports.createOne = async (req, res) => {
    const message = await Message.create({
        author: res.locals.user,
        content: req.body.content,
        type: req.body.type,
        chat: req.body.chat,
        mediafile: req.body.mediafile
    });

    if (message.type === "Mediafile") {
        await MediaFile.findByIdAndUpdate(
            req.body.mediafile, // ID медиафайла
            { $inc: { shares: 1 } } // Увеличить likes на 1
        );
    }

    res.status(204).json(message);
}