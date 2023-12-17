// routes/gameRoutes.js
const express = require('express');
const router = express.Router();

// Array of word sets
const wordSets = [
    ['APPLE', 'EARLY', 'SUNNY', 'ATOMS'],
    ['MAJOR', 'ROUTE', 'CRUDE', 'MAGIC'],
    ['WIDTH', 'HOPED', 'GRAND', 'WRONG'],
    ['GLOVE', 'EMPTY', 'FUNNY', 'GRIEF'],
    ['SHELL', 'LIVER', 'RULER', 'SUGAR'],
    ['SHIRT', 'THICK', 'WRECK', 'SCREW'],
    ['SOUND', 'DEATH', 'FRESH', 'SHELF'],
    ['COVER', 'RATIO', 'RADIO', 'CLEAR'],
    ['SCOPE', 'ENTER', 'FLOUR', 'STAFF'],
    ['HAPPY', 'YOUNG', 'AMONG', 'HYENA'],
    ['STIFF', 'FORCE', 'TRADE', 'SIGHT'],
    ['PLAIN', 'NIGHT', 'FLINT', 'PROOF'],
    ['OPIUM', 'MODEL', 'RIVAL', 'OFFER']
];

// Function to select a random word set
function getRandomWordSet() {
    const randomIndex = Math.floor(Math.random() * wordSets.length);
    return wordSets[randomIndex];
}

// Function to create letter tiles (12 middle letters) and corner tiles (4 unique edge letters)
function createLetterTiles(words) {
    if (words.length !== 4 || !words.every(word => word.length === 5)) {
        throw new Error("Invalid input: Expected four five-letter words");
    }

    // Extract and reduce the first and last letters to unique characters
    let cornerTiles = new Set();
    words.forEach(word => {
        cornerTiles.add(word.charAt(0));
        cornerTiles.add(word.charAt(word.length - 1));
    });

    // Extract the middle three letters of each word
    let middleLetters = words.map(word => word.substring(1, word.length - 1)).join('');

    // Shuffle the middle letters
    middleLetters = middleLetters.split('');
    for (let i = middleLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleLetters[i], middleLetters[j]] = [middleLetters[j], middleLetters[i]];
    }

    // Return the shuffled middle letters and the unique corner tiles
    return { letterTiles: middleLetters.join(''), cornerTiles: Array.from(cornerTiles) };
}

// Route for getting daily words, letter tiles, and corner tiles
router.get('/daily-words', (req, res) => {
    try {
        const words = getRandomWordSet();
        const { letterTiles, cornerTiles } = createLetterTiles(words);
        res.json({ words, letterTiles, cornerTiles });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
