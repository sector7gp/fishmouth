// window.Renderer global class
window.Renderer = class {
    constructor(canvasId, appInstance) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.app = appInstance;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * devicePixelRatio;
        this.canvas.height = rect.height * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
        this.width = rect.width;
        this.height = rect.height;
        if (this.app && this.app.update) this.app.update();
    }

    draw(data, branchShape) {
        if (!data) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
        const { points, perimeter, maxHeight } = data;
        const pad = 60;

        const scaleX = (this.width - pad * 2) / perimeter;
        const scaleY = Math.min(scaleX, (this.height - pad * 2) / (maxHeight + 20));

        const oX = pad;
        const oY = this.height - pad - 40;

        // Marks
        const marks = [0, 0.25, 0.5, 0.75, 1];
        marks.forEach((m, idx) => {
            const x = oX + m * perimeter * scaleX;
            if (m === 0 || m === 1) this.ctx.strokeStyle = '#3b82f6';
            else if (m === 0.5) this.ctx.strokeStyle = '#ef4444';
            else this.ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';

            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.moveTo(x, oY + 10);
            this.ctx.lineTo(x, oY - (maxHeight + 10) * scaleY);
            this.ctx.stroke();
            this.ctx.setLineDash([]);

            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.font = '10px Outfit';
            this.ctx.textAlign = 'center';
            let txt = branchShape === 'round' ? `${Math.round(m * 360)}°` : (m === 0 || m === 1 ? "Cierre" : "Arista");
            this.ctx.fillText(txt, x, oY + 25);
        });

        // Base line
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.beginPath();
        this.ctx.moveTo(oX, oY); this.ctx.lineTo(oX + perimeter * scaleX, oY);
        this.ctx.stroke();

        // Cut line
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        points.forEach((p, i) => {
            const x = oX + p.x_flat * scaleX;
            const y = oY - p.y_val * scaleY;
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();
    }
}
