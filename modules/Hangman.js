export class Hangman {
    constructor() {
        this.mistakes = 0;
        const _hangmanImgs = ['img/hangman0.webp', 'img/hangman1.webp', 'img/hangman2.webp', 'img/hangman3.webp', 'img/hangman4.webp', 'img/hangman5.webp', 'img/hangman6.webp', 'img/hangman7.webp', 'img/hangman8.webp', 'img/hangman9.webp', 'img/hangman10.webp']
        this.maxMistakes = _hangmanImgs.length - 1;

        this.setHangman = (mistakes) => {
            const img = document.querySelector('#hangman img');
            img.src = _hangmanImgs[mistakes]
        }
    }
    getMistakes() {
        return this.mistakes;
    }
    addMistake() {
        if (this.mistakes === this.maxMistakes) return;
        this.mistakes++
    }
}

