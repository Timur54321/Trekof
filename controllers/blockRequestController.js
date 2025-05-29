const BlockRequest = require("../models/blockRequestModel");
const User = require('../models/userModel');

exports.createOne = async (req, res) => {
    const request = await BlockRequest.create(req.body);

    res.status(201).json(request);
};

exports.getAll = async (req, res) => {
    const report = await BlockRequest.find().populate({
        path: 'commentId',
        populate: {
            path: 'author'  // populate поля author внутри commentId
        }
    });

    res.status(200).json(report);
};

exports.deleteOne = async (req, res) => {
    const report = await BlockRequest.findByIdAndDelete(req.params.key);

    res.status(203).json(report);
};

exports.updateOne = async (req, res) => {
    const report = await BlockRequest.findByIdAndUpdate(req.params.key, req.body);

    res.status(202).json(report);
};

exports.blockUserAndDelete = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.body.userForDeletion, {status: 'blocked'});
    const report = await BlockRequest.findByIdAndDelete(req.params.key);

    res.status(203).json(report);
}
