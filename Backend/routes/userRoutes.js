const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protectUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

// Example Protected Route
router.get('/profile', protectUser, (req, res) => {
  res.json({ message: 'User profile accessed', user: req.user });
});

module.exports = router;
