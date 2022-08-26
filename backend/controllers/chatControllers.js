const asyncHandler = require("express-async-handler");
const Chat = require('../models/chatModel')
const User = require('../models/userModel')

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
            throw new Error(error.message)
        }
    }

})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        // check which user is logged in
        // fetch chat and returns all chats that a user is a part of
        // {inside user array: {match this element}}
        Chat.find({ users: { $elemMatch: { eq: req.user._id } } })  //.then((result) => res.send(result))
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })  // sort chats from new to old
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                })

                // return to user
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    // if fields are empty
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }

    var users = JSON.parse(req.body.users);  // parse stringify(frontend) format to json(backend)

    // a group should have more than 2 users
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    users.push(req.user);  // all users and current logged in user

    // a new request to database
    try {
        const groupChat = await Chat.create({  // create a new chat
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        // fetch chat from groupChat and send to user
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;  // use chatId and chatName

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,  // findBy
        {
            chatName: chatName,  // Update chatName
        },
        {
            new: true,  // returns updated name of the group
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    // if any errors
    if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(updatedChat);  // return
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;  // requires chatId of group and userId of addable user

    // check if the requesting to add person is admin
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },  // update users array
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(added);
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    // check if the requesting person is admin
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!removed) {
        res.status(404);
        throw new Error("Chat Not Found");
    } else {
        res.json(removed);
    }
})

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }