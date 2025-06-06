const jwt = require('jsonwebtoken');

const generateUserToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_USER, { expiresIn: '30d' });
};

const generateTrainerToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_TRAINER, { expiresIn: '30d' });
};

module.exports = { generateUserToken, generateTrainerToken };
