const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const exercisesFilePath = path.join(__dirname, '..', 'exerciseJson', 'all_exercises.json');

router.get('/:muscle', (req, res) => {
  try {
    const muscle = req.params.muscle.toLowerCase();

    const data = fs.readFileSync(exercisesFilePath, 'utf8');
    const allExercises = JSON.parse(data);

    const exercises = allExercises[muscle] || [];

    // Respond with exercises inside an object
    res.json({ exercises });
  } catch (err) {
    console.error('Error reading exercises:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// IMPORTANT: export the router!
module.exports = router;
