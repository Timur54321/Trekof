const MediaFile = require("../models/mediaFileModel");
const Request = require("../models/requestModel")

exports.createOne = async (req, res) => {
    const request = await Request.create(req.body);

    res.status(204).json({
        status: 'success',
        data: request
    });
};

exports.getRequests = async (req, ers) => {
    const requests = await Request.find();

    res.status(200).json({
        status: 'success',
        data: requests
    });
};

exports.updateOne = async (req, res) => {
    const request = await Request.findByIdAndUpdate(req.params.key, req.body);

    res.status(201).json({
        status: "sucess",
        data: request
    });
};

exports.deleteCanceledOne = async (req,res) => {
    const request = await Request.findByIdAndDelete(req.params.key);
    const mediaFile = await MediaFile.findByIdAndDelete(request.mediaFile);

    res.status(200).json({
        status: 'success'
    });
};

exports.deleteApprovedOne = async (req, res) => {
    const request = await Request.findByIdAndDelete(req.params.key);

    res.status(200).json({
        status: 'success'
    });
};
