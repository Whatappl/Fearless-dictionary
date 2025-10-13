const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let dictionary = {};
fs.readFile('dictionary.json', 'utf8', (err, data) => {
  if (err) console.error('Error reading dictionary.json:', err);
  else {
    dictionary = JSON.parse(data);
    console.log('Dictionary loaded successfully!');
  }
});

// Serve your HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Search API
app.get('/search', (req, res) => {
  const word = req.query.word?.toLowerCase();
  const definition = dictionary[word];
  res.json({ definition: definition ? definition : "Word not found!" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
