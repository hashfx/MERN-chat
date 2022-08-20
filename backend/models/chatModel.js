const mongoose = require('mongoose');
// schema for chat model
const chatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },  // trim: no space or before chatName
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,  // ID of particular user
                ref: "User"  // reference to user model in db
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,  // reference to latest message
            ref: "Message"  // reference to message model in db
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,  // ID of Admin being a particular user
            ref: "User"  // reference to user model in db
        }
    },
    {
        timestamp: true  // automatically add createdAt and updatedAt fields
    }
);

const Chat = mongoose.model("Chat", chatModel);  // chatModel = Object
module.exports = Chat;