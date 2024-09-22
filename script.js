import { Keyboard } from "./modules/Keyboard.js";
import { Hangman } from "./modules/Hangman.js";
import { Word } from "./modules/Word.js";
import { ResultBoard } from "./modules/ResultBoard.js";

class Game {
    constructor() {
        this.keyboardDiv = document.querySelector("#keyboard");
        this.wordDiv = document.querySelector("#word");
        this.scoreDiv = document.createElement('div');
        this.scoreDiv.id = 'scoreDiv';
        document.body.insertBefore(this.scoreDiv, this.keyboardDiv);
        this.score = 0;  // Initialize score

        // Add audio files
        this.backgroundMusic = new Audio('sounds/background.mp3');  // Path to background music
        this.correctSound = new Audio('sounds/correct.mp3');        // Path to correct word sound
        this.wrongSound = new Audio('sounds/wrong.mp3');            // Path to wrong word sound

        // Create a "PLAY" button
        this.createPlayButton();
    }

    createPlayButton() {
        // Create the button element
        const playButton = document.createElement('button');
        playButton.textContent = "PLAY";
        playButton.id = "playButton";
        document.body.insertBefore(playButton, this.wordDiv);

        // When the button is clicked, start the game
        playButton.addEventListener('click', () => {
            playButton.remove(); // Remove the button after clicking
            this.startGameSetup(); // Start the game setup
        });
    }

    startGameSetup() {
        // Start the background music
        this.backgroundMusic.loop = true;   // Loop the background music
        this.backgroundMusic.volume = 1;  // Adjust volume as needed
        this.backgroundMusic.play().catch(err => {
            console.log('Background music failed to play:', err);
        });

        // Update the score display
        this.updateScore();

        // Set up keyboard, word, hangman, and event listeners
        this.keyboard = new Keyboard();
        this.keyboard.createKeyboard(this.keyboardDiv);

        this.word = new Word();
        this.word.drawWord();
        this.word.showEmptyFields(this.wordDiv);
        this.word.showCategory();

        this.hangman = new Hangman();

        // Set up event listeners for keyboard and word interactions
        this.keyboardDiv.addEventListener('click', this.startGame.bind(this));
        document.addEventListener('keydown', this.startGame.bind(this));

        // Listen for "Next Word" event to reset word and continue game
        document.addEventListener('nextWord', this.resetWord.bind(this));
    }

    startGame(e) {
        if (e.keyCode < 65 || e.keyCode > 90 || e.target.classList.contains('clicked') || (!e.target.classList.contains('letter') && e.keyCode === undefined)) return;

        const word = this.word.getWord();
        const result = this.checkWin(word);

        if (this.hangman.mistakes >= this.hangman.maxMistakes || result) return;

        this.keyboard.getKey(e);
        const letter = this.keyboard.returnKey();

        if (this.keyboard.checkIfClicked(letter)) return;

        this.getResult(letter, word);

        if (this.checkWin(word)) {
            const win = ResultBoard.checkResult(this);

            if (win) {
                this.correctSound.play();
                this.incrementScore(); // Increment score after winning a round
                ResultBoard.addBoard(win, word, this.score);
                this.resetWord();      // Continue to the next word without resetting the score
            } else if (win === false) {
                this.wrongSound.play();   // Play wrong word sound
                ResultBoard.addBoard(false, word, this.score);
                this.endGame();           // Player loses, end the game
            }
        }
    }

    getResult(letter, word) {
        if (word.includes(letter)) {
            this.word.addLetter(letter, word);
        } else {
            this.hangman.addMistake();
            const mistakes = this.hangman.getMistakes();
            this.hangman.setHangman(mistakes);
        }
    }

    checkWin(word) {
        const spans = document.querySelectorAll('#word span');
        const check = [];
        spans.forEach(span => {
            if (span.textContent !== "_ ") {
                check.push(true);
            }
        });
        if (check.length === word.length || this.hangman.mistakes === this.hangman.maxMistakes) {
            return true;
        }
    }

    updateScore() {
        this.scoreDiv.textContent = `Score: ${this.score}`;
    }

    incrementScore() {
        this.score++;
        this.updateScore();
    }

    resetWord() {
        // Clear the current word and draw a new one
        this.wordDiv.innerHTML = "";
        this.word.drawWord();
        this.word.showEmptyFields(this.wordDiv);
        this.word.showCategory();

        // Reset keyboard
        const keys = document.querySelectorAll('#keyboard span');
        keys.forEach(key => key.classList.remove('clicked'));  // Remove the 'clicked' class from all letters

        // Clear the list of clicked letters in the keyboard
        this.keyboard.keysClicked = [];

        // Reset hangman mistakes
        this.hangman.mistakes = 0;
        this.hangman.setHangman(this.hangman.mistakes);
    }
}

const game = new Game();
