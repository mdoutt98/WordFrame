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

    //construct 2D answer array
    let answerArray = new Array(5).fill(null).map(() => new Array(5).fill(null));
    // Fill the first and last row with the first and third words
    answerArray[0] = words[0].split('');
    answerArray[4] = words[2].split('');

    // Fill the first and last column with the second and last words
    for (let i = 1; i < 4; i++) {
        answerArray[i][0] = words[3][(i + 1) - 1];
        answerArray[i][4] = words[1][(i + 1) - 1];
    }




    // Extract letters for corner tiles

    const firstLetterOfFirstWord = words[0][0];
    const lastLetterOfFirstWord = words[0][words[0].length - 1];
    const firstLetterOfThirdWord = words[2][0];
    const lastLetterOfThirdWord = words[2][words[2].length - 1];
    const cornerTiles = [firstLetterOfFirstWord, lastLetterOfFirstWord, firstLetterOfThirdWord, lastLetterOfThirdWord];


    // Extract the middle three letters of each word
    let middleLetters = words.map(word => word.substring(1, word.length - 1)).join('');

    // Shuffle the middle letters
    middleLetters = middleLetters.split('');
    for (let i = middleLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleLetters[i], middleLetters[j]] = [middleLetters[j], middleLetters[i]];
    }

    //reveal three random letters to player
    let revealedLetters = middleLetters.slice(-3);
    middleLetters = middleLetters.slice(0, -3);

    // Function to find the indices of a letter in the 2D answerArray, excluding corner tiles
    function findLetterIndices(letter, array2D, excludePositions = []) {
        let positions = [];

        for (let i = 0; i < array2D.length; i++) {
            for (let j = 0; j < array2D[i].length; j++) {
                // Skip the corner tiles and already used positions
                if ((i === 0 || i === 4) && (j === 0 || j === 4) || excludePositions.some(pos => pos[0] === i && pos[1] === j)) {
                    continue;
                }
                if (array2D[i][j] === letter) {
                    positions.push([i, j]);
                }
            }
        }

        return positions;
    }

    let revealedLetterPositions = [];

    revealedLetters.forEach(letter => {
        let positions = findLetterIndices(letter, answerArray, revealedLetterPositions);
        if (positions.length > 0) {
            // Take the first unused position for this letter
            revealedLetterPositions.push(positions[0]);
        }
    });

    // Return the shuffled middle letters and the unique corner tiles
    return { letterTiles: middleLetters.join(''), cornerTiles: Array.from(cornerTiles), answerArray: Array.from(answerArray), revealedLetters: Array.from(revealedLetters), revealedLetterPositions: Array.from(revealedLetterPositions) };
}

// Route for getting daily words, letter tiles, and corner tiles
router.get('/daily-words', (req, res) => {
    try {
        const words = getRandomWordSet();
        const { letterTiles, cornerTiles, answerArray, revealedLetters, revealedLetterPositions } = createLetterTiles(words);
        res.json({ words, letterTiles, cornerTiles, answerArray, revealedLetters, revealedLetterPositions });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
