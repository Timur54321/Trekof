const Request = require("../models/requestModel")

exports.createOne = async (req, res) => {
    const request = await Request.create(req.body);

    res.status(204).json({
        status: 'success',
        data: request
    });
};