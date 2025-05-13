const User = require('../models/userModel');

exports.getMe = (req, res) => {
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
