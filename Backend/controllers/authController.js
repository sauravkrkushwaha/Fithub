const User = require('../models/User');
const Trainer = require('../models/Trainer');
const { generateUserToken, generateTrainerToken } = require('../utils/generateToken');

// USER CONTROLLERS
const registerUser = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    // Check for existing email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check for existing username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.create({ username, email, phone, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        // name: user.name,
        token: generateUserToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        token: generateUserToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// --------------------------------------------------------------------------------------------------
// TRAINER CONTROLLERS
// const Trainer = require('../models/trainerModel');
// const generateTrainerToken = require('../utils/generateTrainerToken'); // Make sure this file exists and exports a JWT function

const registerTrainer = async (req, res) => {
  try {
    const {
      name,
      coachType, // <-- match schema
      speciality,
      about,
      certifications,
      planPrices,
      password,
      username,
      email,
      phone,
    } = req.body;

    // Check for required fields
    if (!name || !coachType || !password || !planPrices || !username || !email || !phone) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Check for existing email
    const emailExists = await Trainer.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email already taken' });
    }

    // Check for existing username
    const usernameExists = await Trainer.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // File path
    const profilePhoto = req.file ? `/uploads/${req.file.filename}` : null;

    // Parse JSON fields if they come as strings
    const parsedSpeciality = typeof speciality === 'string' ? JSON.parse(speciality) : speciality;
    const parsedCertifications = typeof certifications === 'string' ? JSON.parse(certifications) : certifications;
    const parsedPlanPrices = typeof planPrices === 'string' ? JSON.parse(planPrices) : planPrices;

    // Create trainer
    const trainer = await Trainer.create({
      name,
      username,
      email,
      phone,
      coachType,
      password,
      profilePhoto,
      speciality: parsedSpeciality || [],
      about,
      certifications: parsedCertifications || [],
      planPrices: parsedPlanPrices,
    });

    res.status(201).json({
      _id: trainer._id,
      name: trainer.name,
      username: trainer.username,
      token: generateTrainerToken(trainer._id),
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const loginTrainer = async (req, res) => {
  const { username, password } = req.body;

  try {
    const trainer = await Trainer.findOne({ username });
    if (!trainer || !(await trainer.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: trainer._id,
      name: trainer.name,
      username: trainer.username,
      token: generateTrainerToken(trainer._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  registerTrainer,
  loginTrainer,
};
