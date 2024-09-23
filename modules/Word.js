export class Word {
    constructor() {
        
        this.categoryData = {
            polygon1: ['types of polygon', 'triangle', 'quadrilateral', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon', 'regular'],
            polygon2: ['classification of polygons', 'irregular', 'convex', 'nonconvex', 'equilateral', 'equiangular'],
            arithmetic: ['arithmetic operations', 'addition', 'subtraction', 'multiplication', 'division'],
            set: ['set operations', 'union', 'intersection', 'complement', 'difference'],
            real: ['set of real numbers', 'counting', 'natural', 'whole', 'integer', 'rational', 'irrational', 'real'],
            angle1: ['types of angles', 'acute', 'right', 'obtuse', 'straight', 'reflex'],
            angle2: ['angle pairs', 'complementary', 'supplementary', 'vertical', 'linear'],
            unit1: ['metric units of measurement', 'meter', 'liter', 'gram'],
            unit2: ['english units of measurement', 'pound', 'mile', 'inch', 'yard'],
            solid: ['solid figures', 'cube', 'pyramid', 'cylinder', 'cone', 'sphere'],
            graph: ['types of graph', 'pie', 'bar', 'line', 'pictograph'],
            algebra: ['algebra terms', 'variable', 'coefficient', 'constant', 'equation', 'expression', 'inequality'],
            geometry: ['geometry terms', 'point', 'line', 'segment', 'plane', 'polygon', 'ray', 'angle', 'perpendicular', 'parallel', 'area', 'perimeter', 'volume']
        };
        
        // Fetch categories dynamically
        this.categories = Object.values(this.categoryData);

        this.category;
        this.chosenWord;

    }
    drawWord() {
        const i = Math.floor(Math.random() * this.categories.length);
        const category = this.categories[i];
        const j = Math.floor(Math.random() * (category.length - 1) + 1);
        this.chosenWord = category[j]
        this.category = category[0];
    }
    showEmptyFields(word) {
        for (let i =0; i < this.chosenWord.length; i++) {
            const span = document.createElement('span');
            span.textContent = '_ ';
            word.appendChild(span);
        }
    }
    showCategory() {
        const span = document.querySelector('#category span');
        span.innerHTML = `<strong>Hint:</strong> ${this.category}`;
    }

    getWord() {
        return this.chosenWord
    }

    addLetter(letter, word) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                const span = document.querySelector(`#word span:nth-of-type(${i + 1})`)
                span.textContent = `${letter.toUpperCase()} `;
            }
        }
    }
}
