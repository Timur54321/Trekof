exports.getMe = (req, res) => {
    if (req.user) {
        req.user.password = undefined;
        return res.json(req.user);
    }
};