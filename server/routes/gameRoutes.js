// routes/gameRoutes.js
const express = require('express');
const router = express.Router();

// Example words for the game
const words = ['APPLE', 'EARLY', 'SUNNY', 'ATOMS'];

// Function to create letter tiles (16 letters)
function createLetterTiles(words) {
    if (words.length !== 4 || !words.every(word => word.length === 5)) {
        throw new Error("Invalid input: Expected four five-letter words");
    }

    // Extract and reduce the first and last letters to unique characters
    let edgeLetters = new Set();
    words.forEach(word => {
        edgeLetters.add(word.charAt(0));
        edgeLetters.add(word.charAt(word.length - 1));
    });

    // Convert the edgeLetters set to an array
    const uniqueEdgeLetters = Array.from(edgeLetters);

    // Extract the middle three letters of each word
    let middleLetters = words.map(word => word.substring(1, word.length - 1)).join('');

    // Combine the two sets of letters
    let combinedLetters = middleLetters + uniqueEdgeLetters.join('');

    // Shuffle the combined letters
    combinedLetters = combinedLetters.split('');
    for (let i = combinedLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinedLetters[i], combinedLetters[j]] = [combinedLetters[j], combinedLetters[i]];
    }

    // Return the shuffled letters and the unique edge letters
    return { letterTiles: combinedLetters.join(''), uniqueEdgeLetters };
}

// Route for getting daily words, letter tiles, and unique edge letters
router.get('/daily-words', (req, res) => {
    try {
        const { letterTiles, uniqueEdgeLetters } = createLetterTiles(words);
        res.json({ words, letterTiles, uniqueEdgeLetters });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
