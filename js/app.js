// Main App class using global dependencies
class App {
    constructor() {
        this.inputs = {
            bS: document.getElementById('branch-shape'),
            bD: document.getElementById('branch-dim'),
            hS: document.getElementById('header-shape'),
            hD: document.getElementById('header-dim'),
            ang: document.getElementById('angle'),
            ar: document.getElementById('angle-range')
        };
        this.info = {
            p: document.getElementById('info-perimeter'),
            h: document.getElementById('info-height')
        };
        this.renderer = new window.Renderer('main-canvas', this);
        this.init();
    }

    init() {
        this.inputs.ar.addEventListener('input', (e) => { this.inputs.ang.value = e.target.value; this.update(); });
        this.inputs.ang.addEventListener('input', (e) => { this.inputs.ar.value = e.target.value; this.update(); });

        Object.values(this.inputs).forEach(input => {
            input.addEventListener('input', () => this.update());
            input.addEventListener('change', () => this.update());
        });

        document.getElementById('btn-export').onclick = () => {
            if (this.lastData) window.PDFGenerator.generate(this.lastData, this.getParams());
        };

        this.update();
    }

    getParams() {
        return {
            branchShape: this.inputs.bS.value,
            branchDim: parseFloat(this.inputs.bD.value) || 0,
            headerShape: this.inputs.hS.value,
            headerDim: parseFloat(this.inputs.hD.value) || 0,
            angle: parseFloat(this.inputs.ang.value) || 90
        };
    }

    update() {
        const p = this.getParams();
        let d;
        // Use window.PipeMath global
        if (p.branchShape === 'round' && p.headerShape === 'round') d = window.PipeMath.roundOnRound(p.branchDim / 2, p.headerDim / 2, p.angle);
        else if (p.branchShape === 'square' && p.headerShape === 'round') d = window.PipeMath.squareOnRound(p.branchDim, p.headerDim / 2, p.angle);
        else if (p.branchShape === 'round' && p.headerShape === 'square') d = window.PipeMath.roundOnSquare(p.branchDim / 2, p.headerDim, p.angle);
        else d = window.PipeMath.squareOnSquare(p.branchDim, p.headerDim, p.angle);

        this.lastData = d;
        this.info.p.innerText = `${d.perimeter.toFixed(2)} mm`;
        this.info.h.innerText = `${d.maxHeight.toFixed(2)} mm`;
        if (this.renderer) this.renderer.draw(d, p.branchShape);
    }
}

window.onload = () => { window.appInstance = new App(); };
