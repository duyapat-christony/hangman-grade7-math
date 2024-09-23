export class Word {
    constructor() {
        
        this.categoryData = {
            polygon1: ['type of polygon', 'triangle', 'quadrilateral', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon'],
            polygon2: ['classification of polygons', 'regular', 'irregular', 'convex', 'nonconvex', 'equilateral', 'equiangular'],
            arithmetic: ['arithmetic operation', 'addition', 'subtraction', 'multiplication', 'division'],
            set: ['set operation', 'union', 'intersection', 'complement', 'difference'],
            real: ['set of real number', 'counting', 'natural', 'whole', 'integer', 'rational', 'irrational', 'real'],
            angle1: ['type of angles', 'acute', 'right', 'obtuse', 'straight', 'reflex'],
            angle2: ['angle pairs', 'complementary', 'supplementary', 'vertical', 'linear'],
            unit1: ['metric unit of measurement', 'meter', 'liter', 'gram'],
            unit2: ['english unit of measurement', 'pound', 'mile', 'inch', 'yard'],
            solid: ['solid figure', 'cube', 'pyramid', 'cylinder', 'cone', 'sphere'],
            graph: ['type of graph', 'pie', 'bar', 'line', 'pictograph'],
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
