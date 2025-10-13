const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve static files like index.html

// Load dictionary
let dictionary = {};
try {
    const data = fs.readFileSync('dictionary.json', 'utf-8');
    dictionary = JSON.parse(data);
    console.log('Dictionary loaded successfully!');
} catch (err) {
    console.error('Error reading dictionary.json:', err);
}

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // send your HTML
});

// Route to search words
app.get('/search', (req, res) => {
    const word = req.query.word;
    if (dictionary[word]) {
        res.json({ word, definition: dictionary[word] });
    } else {
        res.json({ word, definition: 'Not found in dictionary' });
    }
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
