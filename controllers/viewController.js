const FriendLink = require("../models/friendLinkModel");
const Playlist = require("../models/playlistModel");
const Request = require("../models/requestModel");
const User = require('../models/userModel');

exports.getMainPage = async (req, res) => {
    const requests = await Request.find({ artist: res.locals.user }).populate('mediaFile');
    const playlists = await Playlist.find({owner: res.locals.user});
    const authors = await User.find({role: 'artist'});
    const friendLinks = await FriendLink.find({user2: res.locals.user}).populate('user1');
    
    res.status(200).render('index', {
        user: res.locals.user,
        requests,
        authors,
        playlists,
        friendLinks
    });
}

exports.getModeratorPage = async (req, res) => {
    const requests = await Request.find().populate(['mediaFile', 'artist']);
    res.status(200).render('moderatorpage', {
        requests
    });
}