const express = require('express');
const { registerTrainer, loginTrainer } = require('../controllers/authController');
const { protectTrainer } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const Trainer = require('../models/Trainer');
const User = require('../models/User');

const router = express.Router();

// Public routes
router.post('/signup', upload.single('profilePhoto'), (req, res, next) => {
  // multer error handling middleware is automatic here
  registerTrainer(req, res, next);
});

router.post('/login', loginTrainer);

// Protected route example
router.get('/profile', protectTrainer, (req, res) => {
  res.json({
    message: 'Trainer profile accessed',
    trainer: req.trainer,
  });
});

// GET all trainers
router.get('/coach-list', async (req, res) => {
  try {
    const filter = {};
    if (req.query.coachType) {
      filter.coachType = req.query.coachType; // match schema
    }
    const trainers = await Trainer.find(filter);
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET a single trainer by ID
router.get('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    if (!user) {
      user = await Trainer.findById(req.params.id)
    }
    if (user) {
      return res.json(user);
    }
    res.status(404).json({ username: req.params.id });
  } catch (err) {
    res.status(500).json({ username: req.params.id });
  }
});

// Add a review to a trainer
router.post('/:id/review', async (req, res) => {
    try {
        const { userName, rating, comment } = req.body;
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).json({ message: 'Coach not found' });

        trainer.reviews.push({ userName, rating, comment, date: new Date() });

        // Optionally update averageRating
        const ratings = trainer.reviews.map(r => r.rating);
        trainer.averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

        await trainer.save();
        res.json(trainer);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete a review from a trainer
router.delete('/:id/review/:reviewId', async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (!trainer) return res.status(404).json({ message: 'Coach not found' });
        trainer.reviews = trainer.reviews.filter(r => r._id.toString() !== req.params.reviewId);
        // Optionally update averageRating
        const ratings = trainer.reviews.map(r => r.rating);
        trainer.averageRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
        await trainer.save();
        res.json(trainer);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update a trainer's information
router.put('/:id', upload.single('profilePhoto'), async (req, res) => {
  try {
    // Parse JSON fields if they are strings
    if (typeof req.body.speciality === "string") {
      req.body.speciality = JSON.parse(req.body.speciality);
    }
    if (typeof req.body.certifications === "string") {
      req.body.certifications = JSON.parse(req.body.certifications);
    }
    if (typeof req.body.planPrices === "string") {
      req.body.planPrices = JSON.parse(req.body.planPrices);
    }

    const updateData = { ...req.body };

    // Handle profilePhoto if using multer
    if (req.file) {
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    if (!updateData.password) {
        delete updateData.password; // Prevent overwriting with empty string
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedTrainer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
