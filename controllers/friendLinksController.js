const FriendLink = require("../models/friendLinkModel");

exports.createOne = async (req, res) => {
    const friendLink = await FriendLink.create({
        user1: res.locals.user._id,
        user2: req.body.user,
        status: 'waiting'
    });

    res.status(204).json({
        status: 'success',
        data: friendLink
    });
};

exports.deleteOne = async (req, res) => {
    const friendLink = await FriendLink.findByIdAndDelete(req.params.key);

    res.status(203).json({
        status: 'success',
        data: friendLink
    });
};

exports.updateOne = async (req, res) => {
    const friendLink = await FriendLink.findByIdAndUpdate(req.params.key, req.body);

    res.status(200).json(friendLink);
};

exports.getMyFriends = async (req, res) => {
    const currentUserId = res.locals.user._id;
    const friendLinks = await FriendLink.find({
        $or: [
          { user1:  currentUserId},
          { user2: currentUserId }
        ]
    }).populate(['user1','user2']);

    let users = [];
    for (let i = 0; i < friendLinks.length; i++)
    {
        if (friendLinks[i].status === "waiting") continue;
        if (friendLinks[i].user1._id.toString() == currentUserId)
        {
            users.push(friendLinks[i].user2);
            continue;
        } 
        users.push(friendLinks[i].user1);
    }

    res.status(200).json(users);
}
