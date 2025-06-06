const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const reviewSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, default: '' },
  date: { type: Date, default: Date.now }
});

const trainerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Added username field
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },    // Added email field
  phone: { type: String, required: true },                  // Added phone field
  password: { type: String, required: true },
  profilePhoto: { type: String },
  coachType: { type: String, required: true },              // Changed from 'type' to 'coachType'
  speciality: {
    type: [String],
    default: []
  },
  about: { type: String },                                  // Changed from 'aboutMe' to 'about'
  certifications: {
    type: [String],
    validate: [arr => arr.length <= 4, 'Maximum 4 certification links allowed'],
    default: []
  },
  planPrices: {                                             // Changed from 'packages' to 'planPrices'
    monthly: { type: Number, required: true },
    quarterly: { type: Number, required: true },
    halfYearly: { type: Number, required: true },
    yearly: { type: Number, required: true }
  },
  reviews: {
    type: [reviewSchema],
    default: []
  },
  averageRating: {
    type: Number,
    default: null
  }
});

// Hash password before saving
trainerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
trainerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Trainer', trainerSchema);
