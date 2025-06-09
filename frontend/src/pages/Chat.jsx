import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Image } from "react-bootstrap";
import axios from "axios";
import "./Chat.css";

function Chat() {
  const { id: otherUserId } = useParams();
  const myUserId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          _id: Date.now(),
        },
      ]);
      setNewMessage("");
    } catch (err) {
      alert("Failed to send message");
    }
  };

  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <Container className="chat-container">
      <div className="chat-header">
        <Image src={defaultAvatar} roundedCircle className="chat-avatar" />
        <h4 className="chat-title">Chat</h4>
      </div>

      <div className="chat-body">
        {messages.map((message) => {
          const isSender = message.sender === myUserId;
          return (
            <div
              key={message._id || message.timestamp}
              className={`chat-bubble ${isSender ? "sent" : "received"}`}
            >
              <p className="chat-text">{message.message}</p>
              <span className="chat-time">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <Form onSubmit={handleSendMessage} className="chat-form">
        <Form.Control
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-input"
        />
        <Button type="submit" variant="primary" className="chat-button">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default Chat;
