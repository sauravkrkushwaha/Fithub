const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const bodyExerciseRoutes = require('./routes/exerciseRoutes');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();

const app = express();

connectDB();

const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/body-exercise', bodyExerciseRoutes);
app.use('/api/chats', chatRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
