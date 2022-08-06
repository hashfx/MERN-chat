import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {

  // store chats data in useState hook
  const [chats, setChats] = useState([])  // chat: a variable to display the data :: setChats to change chat data

  // call api to get all chats
  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat')
    setChats(data)
  };

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div>
      {chats.map((chat) => (  // map through chats and display each chat
        <div key={chat._id}>  {/* key: unique identifier for each chat */}
          {chat.chatName}  {/* map through chats data and display chatName on screen */}
        </div>
      ))}
    </div>
  );
};

export default ChatPage