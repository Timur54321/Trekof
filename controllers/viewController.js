const Request = require("../models/requestModel");

exports.getMainPage = async (req, res) => {
    res.status(200).render('index', {
        user: res.locals.user
    });
}

exports.getModeratorPage = async (req, res) => {
    const requests = await Request.find().populate(['mediaFile', 'artist']);
    res.status(200).render('moderatorpage', {
        requests
    });
}