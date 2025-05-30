const Chat = require("../models/chatModel")

exports.loadChat = async (req, res) => {
    const currentUserId = res.locals.user._id;
    const otherUserId = req.params.key;
    let sendChat;

    const chat = await Chat.findOne({
        $or: [
          { 
            $and: [
              { user1: currentUserId },
              { user2: otherUserId }
            ]
          },
          { 
            $and: [
              { user1: otherUserId },
              { user2: currentUserId }
            ]
          }
        ]
    });

    if (!chat) {
        sendChat = await Chat.create({user1: currentUserId, user2: otherUserId });
    }else {
        sendChat = chat;      
    }

    res.status(200).json(sendChat);
};

exports.getChat = async (req, res) => {
    const chat = await Chat.findById(req.params.key)
    .populate('user1')
    .populate('user2')
    .populate({
        path: 'messages',
        populate: [
            {
                path: 'mediafile',
                populate: {
                    path: 'artist'
                }
            }
        ]
    });

    if (chat.status === "updated") {
        const updatedChat = await Chat.findByIdAndUpdate(chat._id, {status: 'still'});
    }

    res.status(200).json(chat);
};

exports.getMyChats = async (req, res) => {
    const userId = res.locals.user._id;
    
    const chats = await Chat.find({
      $or: [
          { user1: userId },
          { user2: userId }
      ]
    }).populate(['user1', 'user2']);

    res.status(200).json(chats);
};

