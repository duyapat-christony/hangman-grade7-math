export class Hangman {
    constructor() {
        this.mistakes = 0;
        this.hangmanImgs = [
            'img/hangman0.webp', 'img/hangman1.webp', 'img/hangman2.webp', 
            'img/hangman3.webp', 'img/hangman4.webp', 'img/hangman5.webp', 
            'img/hangman6.webp', 'img/hangman7.webp', 'img/hangman8.webp', 
            'img/hangman9.webp', 'img/hangman10.webp'
        ];
        this.maxMistakes = this.hangmanImgs.length - 1;
        this.preloadedImages = [];

        // Preload images before the game starts
        this.preloadImages(() => {
            this.startGame(); // Call game start when preloading is done
        });
    }

    // Function to preload images
    preloadImages(callback) {
        let loadedImages = 0;

        this.hangmanImgs.forEach((src, index) => {
            const img = new Image();
            img.src = src;

            img.onload = () => {
                loadedImages++;
                this.preloadedImages[index] = img; // Store preloaded image

                // Check if all images are loaded
                if (loadedImages === this.hangmanImgs.length) {
                    callback(); // Start the game after all images are loaded
                }
            };

            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
            };
        });
    }

    // Function to start the game (define this method based on your game logic)
    startGame() {
        console.log("Images preloaded, starting game...");
        // Your game logic or initialization goes here
    }

    setHangman(mistakes) {
        const img = document.querySelector('#hangman img');
        img.src = this.hangmanImgs[mistakes]; // Use preloaded images here
    }

    getMistakes() {
        return this.mistakes;
    }

    addMistake() {
        if (this.mistakes === this.maxMistakes) return;
        this.mistakes++;
    }
}
