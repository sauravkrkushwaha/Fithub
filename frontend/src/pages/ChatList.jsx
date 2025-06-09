import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChatList.css";

function ChatList() {
  const navigate = useNavigate();
  const myUserId = localStorage.getItem("userId");
  const [chats, setChats] = useState([]);
  const [userNames, setUserNames] = useState({});

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const fetchUserNames = async (userIds) => {
    const names = {};
    await Promise.all(
      userIds.map(async (id) => {
        try {
          const res = await axios.get(`http://localhost:5000/api/trainer/${id}`);
          names[id] = res.data.username || res.data.name || "Unknown User";
        } catch {
          names[id] = "Unknown User";
        }
      })
    );
    setUserNames(names);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chats/user/${myUserId}`);
        const chatMap = {};

        res.data.forEach((msg) => {
          const otherUserId = msg.sender === myUserId ? msg.receiver : msg.sender;
          if (!chatMap[otherUserId]) {
            chatMap[otherUserId] = {
              userId: otherUserId,
              lastMessage: msg.message,
              time: new Date(msg.timestamp),
              unread: 0,
            };
          } else if (new Date(msg.timestamp) > chatMap[otherUserId].time) {
            chatMap[otherUserId].lastMessage = msg.message;
            chatMap[otherUserId].time = new Date(msg.timestamp);
          }
        });

        const chatList = Object.values(chatMap).sort((a, b) => b.time - a.time);
        setChats(chatList);

        const userIds = chatList.map((chat) => chat.userId);
        fetchUserNames(userIds);
      } catch {
        setChats([]);
      }
    };

    if (myUserId) fetchChats();
  }, [myUserId]);

  return (
    <div className="chat-list-container">
      {chats.map((chat) => (
        <div
          key={chat.userId}
          className="chat-item"
          onClick={() => navigate(`/chat/${chat.userId}`)}
        >
          <img src={defaultAvatar} alt="avatar" className="chat-avatar" />
          <div className="chat-details">
            <div className="chat-header">
              <p className="chat-name">{userNames[chat.userId]}</p>
              <span className="chat-time">
                {chat.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <p className="chat-message">{chat.lastMessage}</p>
              {chat.unread > 0 && <span className="badge">{chat.unread}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
