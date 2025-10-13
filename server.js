const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Load dictionary JSON file
let dictionary = {};
fs.readFile('dictionary.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading dictionary file:', err);
  } else {
    dictionary = JSON.parse(data);
    console.log('Dictionary loaded successfully!');
  }
});

// Enable JSON parsing
app.use(express.json());

// Search route
app.get('/search', (req, res) => {
  const word = req.query.word?.toLowerCase();
  if (!word) return res.json({ definition: "Please provide a word!" });

  const definition = dictionary[word];
  res.json({ definition: definition ? definition : "Word not found!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
