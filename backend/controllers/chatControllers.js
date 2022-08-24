const expressAsyncHandler = require("express-async-handler");
const Chat = require('../models/chatModel')

// create or fetch one-on-one chat
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;  // userId of logged in user

    // check if user has sent userId in request
    if (!userId) {
        console.log("UserId parameter not sent with request");
        return res.sendStatus(400)
    }

    // check if a chat with userId exists, then return it else create a chat with this user
    var isChat = await Chat.find({
        isGroupChat: false,  // one-to-one chat is not group chat
        $and: [  // both conditions should be met
            { users: { $elemMatch: { $eq: req.user._id } } },  // equal to current user logged in
            { users: { $elemMatch: { $eq: userId } } },  // userId of sent user
        ]
    }).populate("users", "-password")  // if chat is found, populate users array with everything except password
        .populate("latestMessage")  // latest message


    isChat = await User.populate(isChat, {  // populate sender
        path: 'latestMessage.sender',
        select: "name pic email"  // what to populate
    })

    // check if chat exists
    if (isChat.length > 0) {
        res.send(isChat[0])  // display existing chat
    } else {
        // create a new chat
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]  // current logged in user && second user of chat
        }

        // query database and store data in database
        try {
            const createdChat = await Chat.create(chatData)  // chat is created

            // take the newly created chat and send it to user with _id
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password")
            res.status(200).send(FullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)  // todo 22:50
        }
    }

})