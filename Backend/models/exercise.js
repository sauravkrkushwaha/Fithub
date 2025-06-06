const mongoose = require('mongoose');

// Import your schema
const exerciseSchema = new mongoose.Schema({
  exercise: { type: String, required: true },
  url: { type: String },
  videos: [{ type: String }],
  instructions: [{ type: String }]
});

const muscleGroupSchema = new mongoose.Schema({
  muscle: { type: String, required: true },
  exercises: [exerciseSchema]
});

module.exports = mongoose.model('MuscleGroup', muscleGroupSchema);
