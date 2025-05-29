const User = require('../models/userModel');

exports.getMe = (req, res) => {
    if (req.user.status === "blocked") {
        return res.status(403).json({
            status: 'blocked',
            error: "Ваш аккаунт заблокирован"
        });
    }
    if (req.user) {
        req.user.password = undefined;
        return res.json(req.user);
    }
};

exports.updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.key, req.body);

    res.status(200).json({
        status: 'success',
        data: user
    });
};

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.key);
    user.password = undefined;

    res.status(200).json({
        status: 'success',
        data: user
    });
};

exports.findUsers = async (req, res) => {
    const searchQuery = req.params.key;
    const currentUserId = res.locals.user._id;

    const users = await User.find({
        name: {$regex: searchQuery, $options: 'i'},
        _id: { $ne: currentUserId } 
    });

    res.status(200).json({
        status: 'success',
        data: users
    });
};

exports.getAuthors = async (req, res) => {
    const authors = await User.find({role: 'artist'});

    res.status(200).json(authors)
};

exports.addChannel = async (req, res) => {
    const userId = req.params.key;
    console.log(req.body.channel);

    const user = await User.findByIdAndUpdate(
        userId, // ID плейлиста
        { $push: { followedChannels: req.body.channel } }, // audiofileId - ObjectId аудиофайла
        { new: true } // Вернуть обновленный документ
    );

    res.status(200).json(user);
};

exports.getAuthorsBySearch = async (req, res) => {
    try {
        const key = req.params.key;
        const tracks = await User.find({ 
            name: { $regex: key, $options: 'i' },
            role: 'artist'
        });
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getModerators = async (req, res) => {
    const users = await User.find({role: 'moderator'});

    res.status(200).json(users);
};

exports.deleteOne = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.key);

    res.status(203).json(user);
}
