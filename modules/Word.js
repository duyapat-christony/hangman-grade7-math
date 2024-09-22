export class Word {
    constructor() {
        
        this.polygon = ['types of polygon', 'triangle', 'quadrilateral', 'pentagon', 'hexagon', 'heptagon', 'octagon', 'nonagon', 'decagon', 'regular', 'irregular', 'convex', 'nonconvex', 'equilateral', 'equiangular'];
        this.arithmetic = ['arithmetic operations', 'addition', 'subtraction', 'multiplication', 'division'];
        this.set = ['set operations', 'union', 'intersection', 'complement', 'difference'];
        this.real = ['set of real numbers', 'counting', 'natural', 'whole', 'integer', 'rational', 'irrational', 'real'];
        this.angle = ['angles', 'acute', 'right', 'obtuse', 'straight', 'reflex', 'complementary', 'supplementary', 'vertical']
        this.unit = ['units of measurement', 'meter', 'liter', 'gram', 'pound', 'inch', 'yard']
        this.solid = ['solid figures', 'cube', 'pyramid', 'cylinder', 'cone', 'sphere']
        this.graph = ['types of graph', 'pie', 'bar', 'line', 'pictograph']
        this.algebra = ['algebra terms', 'variable', 'coefficient', 'constant', 'equation', 'expression', 'inequality']
        this.geometry = ['geometry terms', 'point', 'line', 'segment', 'plane', 'polygon', 'ray', 'angle', 'perpendicular', 'parallel', 'area', 'perimeter', 'volume']

        this.categories = [this.polygon, this.arithmetic, this.set, this.real, this.angle, this.unit, this.solid, this.graph, this.algebra, this.geometry];
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
        span.textContent = this.category.toUpperCase();
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
