// Import required modules
const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Optional but recommended for frontend requests

const app = express();
const PORT = 3000;

// Enable CORS so frontend can request from another file
app.use(cors());
app.use(express.json());

// Load dictionary JSON file
let dictionary = {};
fs.readFile('dictionary.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading dictionary.json:', err);
  } else {
    dictionary = JSON.parse(data);
    console.log('Dictionary loaded successfully!');
  }
});

// Search route
app.get('/search', (req, res) => {
  const word = req.query.word?.toLowerCase();

  if (!word) {
    return res.json({ definition: "Please provide a word!" });
  }

  const definition = dictionary[word];
  res.json({ definition: definition ? definition : "Word not found!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
