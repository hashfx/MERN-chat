const mongoose = require('mongoose');

const messageModel = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",  // reference to chatModel
        },
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;