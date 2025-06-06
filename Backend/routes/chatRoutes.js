const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages between two users (by sender/receiver ObjectId)
router.get('/messages/:userA/:userB', async (req, res) => {
  const { userA, userB } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userA, receiver: userB },
        { sender: userB, receiver: userA }
      ]
    }).sort('timestamp');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send a message between two users
router.post('/message', async (req, res) => {
  const { sender, receiver, message } = req.body;
  try {
    const newMessage = await Message.create({ sender, receiver, message });
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get all messages for a user (by sender/receiver ObjectId)
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({
    $or: [{ sender: userId }, { receiver: userId }]
  }).sort('-timestamp');
  res.json(messages);
});

module.exports = router;