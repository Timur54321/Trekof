const HB = require('../utils/htmlBase');

exports.getAuthorPage = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            html: HB.getAuthorPage()
        }
    });
};

exports.getUserPage = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            html: HB.getUserPage()
        }
    })
};

exports.getArtistPage = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            html: HB.getArtistPage()
        }
    })
};