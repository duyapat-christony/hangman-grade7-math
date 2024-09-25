export class ResultBoard {
    constructor() {}

    static addBoard(win, word, score) {
        const board = document.querySelector('#resultBoard');
        const text = document.querySelector('#resultBoard h2');
        const button = document.createElement('button');
        const scoreText = document.createElement('p');
        scoreText.id = 'scoreText';

        // Display the current score
        scoreText.textContent = `Score: ${score}`;
        board.appendChild(scoreText);

        const wait = () => {
            board.classList.add('active');
        };

        if (win) {
            text.textContent = `The word is ${word.toUpperCase()}!✅`;
            button.textContent = "Next Word";
            button.addEventListener('click', () => {
                board.classList.remove('active');
                button.remove();  // Clean up after the button click
                scoreText.remove();  // Remove the score display
                text.textContent = "";  // Clear the win text
                document.dispatchEvent(new Event('nextWord'));  // Trigger next word
            });
            board.appendChild(button);
            setTimeout(wait, 100);
        } else {
            for (let i = 0; i < word.length; i++) {
                const span = document.querySelector(`#word span:nth-of-type(${i + 1})`);
                if (span.textContent.includes('_')) {
                    span.textContent = `${word[i].toUpperCase()} `;
                    span.style.color = "red";
                }
            }
            text.textContent = "Sorry, you lose 🙁!";
            button.textContent = "Try Again";
            button.addEventListener('click', () => {
                board.classList.remove('active');
                location.reload();  // Refresh the game after losing
            });
            board.appendChild(button);
            setTimeout(wait, 1500);
        }
    }

    static showGameOver(score) {
        const board = document.querySelector('#resultBoard');
        const text = document.querySelector('#resultBoard h2');
        const button = document.createElement('button');
        const scoreText = document.createElement('p');
        scoreText.id = 'scoreText';

        scoreText.textContent = `Score: ${score}`;
        board.appendChild(scoreText);

        text.textContent = "Sorry, time is up ⏰!";
        button.textContent = "New Game";
        button.addEventListener('click', () => {
            board.classList.remove('active');
            location.reload();  
        });
        board.appendChild(button);
        board.classList.add('active');
    }

    static checkResult(thisGame) {
        return thisGame.hangman.mistakes < thisGame.hangman.maxMistakes;
    }
}
