const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Trainer = require('../models/Trainer');

// Helper function to extract token from headers
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

// USER AUTH MIDDLEWARE
const protectUser = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.FITHUB_USER);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// TRAINER AUTH MIDDLEWARE
const protectTrainer = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.FITHUB_TRAINER);
    req.trainer = await Trainer.findById(decoded.id).select('-password');
    if (!req.trainer) {
      return res.status(401).json({ message: 'Trainer not found' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protectUser, protectTrainer };
