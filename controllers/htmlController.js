const HB = require('../utils/htmlBase');

exports.getAuthorPage = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            html: HB.getAuthorPage()
        }
    });
};