const express = require('express');
const router = express.Router();
const MuscleGroup = require('../models/exercise'); // Adjust path if needed

// GET /api/body-exercise/:muscle
router.get('/:muscle', async (req, res) => {
    try {
        const muscle = req.params.muscle.toLowerCase();
        const group = await MuscleGroup.findOne({ muscle });
        if (!group) {
            return res.status(404).json({ exercises: [] });
        }
        console.log(`Found exercises for muscle: ${muscle}`);
        res.json({ exercises: group.exercises });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;