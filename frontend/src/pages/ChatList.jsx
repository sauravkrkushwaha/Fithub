import React, { useEffect, useState } from "react";
import { ListGroup, Image, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChatList.css";

function ChatList() {
    const navigate = useNavigate();
    const myUserId = localStorage.getItem("userId");
    const [chats, setChats] = useState([]);
    const [userNames, setUserNames] = useState({});

    // Fetch user names for all unique userIds in chat list
    const fetchUserNames = async (userIds) => {
        const names = {};
        await Promise.all(userIds.map(async (id) => {
            try {
                const res = await axios.get(`http://localhost:5000/api/trainer/${id}`);
                console.log("data",res.data.username);
                names[id] = res.data.username || res.data.name; // fetch username instead of name
            } catch {
                console.error(`Failed to fetch user with id ${id}`);
                names[id] = id;
            }
        }));
        
        setUserNames(names);
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/chats/user/${myUserId}`);
                const chatMap = {};
                res.data.forEach(msg => {
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

                // Fetch names for all unique userIds
                const userIds = chatList.map(chat => chat.userId);
                fetchUserNames(userIds);
            } catch (err) {
                setChats([]);
            }
        };
        if (myUserId) fetchChats();
        // eslint-disable-next-line
    }, [myUserId]);
    // console.log(userNames);

    return (
        <div className="chat-list-container">
            <h2 className="text-center mb-4">Chats</h2>
            <ListGroup>
                {chats.map((chat) => (
                    <ListGroup.Item
                        key={chat.userId}
                        className="chat-item d-flex align-items-center"
                        onClick={() => navigate(`/chat/${chat.userId}`)}
                    >
                        <Image src="https://via.placeholder.com/50" roundedCircle className="chat-avatar" />
                        <div className="chat-details flex-grow-1 ms-3">
                            <div className="d-flex justify-content-between">
                                <h5 className="chat-name">{userNames[chat.userId]}</h5>
                                <small className="chat-time text-muted">
                                    {chat.time.toLocaleString()}
                                </small>
                            </div>
                            <p className="chat-message text-truncate mb-0">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                            <Badge bg="primary" pill>
                                {chat.unread}
                            </Badge>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default ChatList;