const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Define Team model
const Team = mongoose.model('users', {
  name: String,
  totalGamesPlayed: Number, 
  score: Number
});

// Connect to MongoDB   
mongoose.connect('mongodb://127.0.0.1:27017/KBN');

// Define routes
app.get('/', async (req, res) => {
  try {
    // Fetch leaderboard data from MongoDB
    const leaderboardData = await Team.find().sort({ score: -1 });

    console.log(leaderboardData);

    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 27017;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
