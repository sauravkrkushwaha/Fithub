const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const bodyExerciseRoutes = require('./routes/exerciseRoutes');
const chatRoutes = require('./routes/chatRoutes');
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { exec } = require('child_process');

const app = express();

// Connect to MongoDB
connectDB();

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

// 🕒 Cron job: Runs scrapper.py every 15 days at 2 AM
cron.schedule('0 2 */15 * *', () => {
  console.log('⏳ Running scrapper.py to update all_exercises.json...');
  const scriptPath = path.join(__dirname, 'exerciseJson', 'scrapper.py');

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error running scrapper.py: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr: ${stderr}`);
    }
    console.log(`✅ Scraper Output:\n${stdout}`);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
