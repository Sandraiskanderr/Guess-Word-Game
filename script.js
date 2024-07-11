const words = [
    { word: "javascript", hint: "A popular programming language for web development" },
    { word: "python", hint: "A programming language known for its readability" },
    { word: "html", hint: "Standard markup language for creating web pages" },
    { word: "css", hint: "Style sheet language used for describing the presentation of a document" },
    { word: "react", hint: "A JavaScript library for building user interfaces" },
    { word: "nodejs", hint: "JavaScript runtime built on Chrome's V8 JavaScript engine" },
    { word: "bootstrap", hint: "A popular CSS framework for developing responsive and mobile-first websites" },
    { word: "typescript", hint: "A superset of JavaScript that adds static types" },
    { word: "jquery", hint: "A fast, small, and feature-rich JavaScript library" },
    { word: "mongodb", hint: "A document-based, NoSQL database" }
];

let selectedWord = '';
let selectedHint = '';
let displayedWord = '';
let incorrectGuesses = 0;

const hintElement = document.getElementById('hint');
const wordElement = document.getElementById('word');
const feedbackElement = document.getElementById('feedback');
const incorrectCountElement = document.getElementById('incorrect-count');
const guessInputElement = document.getElementById('guess-input');
const submitGuessButton = document.getElementById('submit-guess');
const resetGameButton = document.getElementById('reset-game');

function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    selectedHint = words[randomIndex].hint;
    displayedWord = '_'.repeat(selectedWord.length);
    incorrectGuesses = 0;

    hintElement.textContent = selectedHint;
    wordElement.textContent = displayedWord;
    feedbackElement.textContent = '';
    incorrectCountElement.textContent = incorrectGuesses;
    guessInputElement.value = '';
}

function updateDisplay() {
    wordElement.textContent = displayedWord;
    incorrectCountElement.textContent = incorrectGuesses;
}

function handleGuess() {
    const guess = guessInputElement.value.toLowerCase();
    guessInputElement.value = '';

    if (guess === '') {
        feedbackElement.textContent = 'You have to enter a guess.';
        return;
    }

    if (guess === selectedWord) {
        displayedWord = selectedWord;
        feedbackElement.textContent = 'Congratulations! You guessed the word!';
        feedbackElement.classList.add('success');
        updateDisplay();
        return;
    }

    if (guess.length === 1) {
        let newDisplayedWord = '';
        let correctGuess = false;

        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guess) {
                newDisplayedWord += guess;
                correctGuess = true;
            } else {
                newDisplayedWord += displayedWord[i];
            }
        }

        if (correctGuess) {
            displayedWord = newDisplayedWord;
            feedbackElement.textContent = 'Correct guess!';
            feedbackElement.classList.add('success');
        } else {
            incorrectGuesses++;
            feedbackElement.textContent = 'Incorrect guess. Try again.';
            feedbackElement.classList.remove('success');
        }

        if (displayedWord === selectedWord) {
            feedbackElement.textContent = 'Congratulations! You guessed the word!';
            feedbackElement.classList.add('success');
        }
    } else {
        incorrectGuesses++;
        feedbackElement.textContent = 'Incorrect guess. Try again.';
        feedbackElement.classList.remove('success');
    }

    updateDisplay();
}

submitGuessButton.addEventListener('click', handleGuess);
resetGameButton.addEventListener('click', startGame);

startGame();
