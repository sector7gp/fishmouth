// window.PipeMath global object
window.PipeMath = {
    roundOnRound(r1, r2, angle, steps = 120) {
        const radAngle = (angle * Math.PI) / 180;
        const pts = [];
        const perimeter = 2 * Math.PI * r1;
        for (let i = 0; i <= steps; i++) {
            const phi = (i / steps) * 2 * Math.PI;
            const x = r1 * Math.cos(phi);
            const y = r1 * Math.sin(phi);
            const term1 = Math.sqrt(Math.max(0, r2 ** 2 - y ** 2)) / Math.sin(radAngle);
            const term2 = x / Math.tan(radAngle);
            const z = term1 - term2;
            pts.push({ phi, x_flat: (phi * r1), y_val: z });
        }
        this.normalize(pts);
        return { points: pts, perimeter, maxHeight: Math.max(...pts.map(p => p.y_val)) };
    },

    squareOnRound(s1, r2, angle, steps = 120) {
        const radAngle = (angle * Math.PI) / 180;
        const pts = [];
        const perimeter = 4 * s1;
        const hS = s1 / 2;
        for (let i = 0; i <= steps; i++) {
            const f = i / steps;
            let x, y;
            if (f <= 0.25) { x = hS; y = -hS + (f / 0.25) * s1; }
            else if (f <= 0.5) { x = hS - ((f - 0.25) / 0.25) * s1; y = hS; }
            else if (f <= 0.75) { x = -hS; y = hS - ((f - 0.5) / 0.25) * s1; }
            else { x = -hS + ((f - 0.75) / 0.25) * s1; y = -hS; }
            const term1 = Math.sqrt(Math.max(0, r2 ** 2 - y ** 2)) / Math.sin(radAngle);
            const term2 = x / Math.tan(radAngle);
            const z = term1 - term2;
            pts.push({ x_flat: f * perimeter, y_val: z });
        }
        this.normalize(pts);
        return { points: pts, perimeter, maxHeight: Math.max(...pts.map(p => p.y_val)) };
    },

    roundOnSquare(r1, w2, angle, steps = 120) {
        const radAngle = (angle * Math.PI) / 180;
        const pts = [];
        const perimeter = 2 * Math.PI * r1;
        const hW2 = w2 / 2;
        for (let i = 0; i <= steps; i++) {
            const phi = (i / steps) * 2 * Math.PI;
            const x = r1 * Math.cos(phi);
            const z = hW2 / Math.sin(radAngle) - x / Math.tan(radAngle);
            pts.push({ phi, x_flat: (phi * r1), y_val: z });
        }
        this.normalize(pts);
        return { points: pts, perimeter, maxHeight: Math.max(...pts.map(p => p.y_val)) };
    },

    squareOnSquare(s1, w2, angle, steps = 120) {
        const radAngle = (angle * Math.PI) / 180;
        const pts = [];
        const perimeter = 4 * s1;
        const hS1 = s1 / 2;
        const hW2 = w2 / 2;
        for (let i = 0; i <= steps; i++) {
            const f = i / steps;
            let x, y;
            if (f <= 0.25) { x = hS1; y = -hS1 + (f / 0.25) * s1; }
            else if (f <= 0.5) { x = hS1 - ((f - 0.25) / 0.25) * s1; y = hS1; }
            else if (f <= 0.75) { x = -hS1; y = hS1 - ((f - 0.5) / 0.25) * s1; }
            else { x = -hS1 + ((f - 0.75) / 0.25) * s1; y = -hS1; }
            const z = hW2 / Math.sin(radAngle) - x / Math.tan(radAngle);
            pts.push({ x_flat: f * perimeter, y_val: z });
        }
        this.normalize(pts);
        return { points: pts, perimeter, maxHeight: Math.max(...pts.map(p => p.y_val)) };
    },

    normalize(pts) {
        const minY = Math.min(...pts.map(p => p.y_val));
        pts.forEach(p => p.y_val -= minY);
    }
};
