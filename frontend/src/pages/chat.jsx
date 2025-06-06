import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, ListGroup, Image } from "react-bootstrap";
import axios from "axios";
import "./Chat.css";

function Chat() {
    const { id: otherUserId } = useParams(); // id is the other user's ObjectId (string)
    const myUserId = localStorage.getItem("userId"); // Store your own ObjectId in localStorage at login/signup
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    // Fetch messages between the two users
    useEffect(() => {
        if (!myUserId || !otherUserId) return;
        const fetchMessages = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/chats/messages/${myUserId}/${otherUserId}`
                );
                setMessages(res.data);
            } catch (err) {
                setMessages([]);
            }
        };
        fetchMessages();
    }, [myUserId, otherUserId]);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            await axios.post("http://localhost:5000/api/chats/message", {
                sender: myUserId,
                receiver: otherUserId,
                message: newMessage,
            });
            setMessages((prev) => [
                ...prev,
                {
                    sender: myUserId,
                    receiver: otherUserId,
                    message: newMessage,
                    timestamp: new Date(),
                },
            ]);
            setNewMessage("");
        } catch (err) {
            alert("Failed to send message");
        }
    };

    return (
        <Container className="chat-inbox-container">
            <div className="chat-header d-flex align-items-center mb-3">
                <Image src="https://via.placeholder.com/50" roundedCircle className="chat-header-avatar" />
                <div className="chat-header-details ms-3">
                    <h5 className="chat-header-name mb-0">Chat</h5>
                </div>
            </div>
            <ListGroup className="chat-messages" style={{ minHeight: 300, maxHeight: 400, overflowY: "auto" }}>
                {messages.map((message, idx) => (
                    <ListGroup.Item
                        key={message._id || idx}
                        className={`chat-message ${message.sender === myUserId ? "client" : "coach"}`}
                        style={{
                            textAlign: message.sender === myUserId ? "right" : "left",
                            background: message.sender === myUserId ? "#e6f7ff" : "#f6f6f6",
                            border: "none",
                        }}
                    >
                        {message.message}
                        <div style={{ fontSize: "0.75em", color: "#888" }}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                    </ListGroup.Item>
                ))}
                <div ref={messagesEndRef} />
            </ListGroup>
            <Form onSubmit={handleSendMessage} className="chat-input-form d-flex mt-3">
                <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="chat-input"
                    autoComplete="off"
                />
                <Button type="submit" variant="dark" className="chat-send-button ms-2">
                    Send
                </Button>
            </Form>
        </Container>
    );
}

export default Chat;