// window.PDFGenerator global object
window.PDFGenerator = {
    generate(data, p) {
        const { jsPDF } = window.jspdf;
        const orient = data.perimeter > 180 ? 'landscape' : 'portrait';
        const doc = new jsPDF({
            orientation: orient,
            unit: 'mm',
            format: 'a4'
        });

        const pW = doc.internal.pageSize.getWidth();
        const pH = doc.internal.pageSize.getHeight();
        const sX = (pW - data.perimeter) / 2;
        const sY = (pH + data.maxHeight) / 2;

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Plantilla Fishmouth 1:1 - Branch: ${p.branchShape} ${p.branchDim}mm | Header: ${p.headerShape} ${p.headerDim}mm | Ang: ${p.angle}°`, 10, 10);
        doc.text(`Perimetro: ${data.perimeter.toFixed(2)} mm | Altura Max: ${data.maxHeight.toFixed(2)} mm`, 10, 15);

        [0, 0.25, 0.5, 0.75, 1].forEach(m => {
            const x = sX + m * data.perimeter;
            if (m === 0 || m === 1) doc.setDrawColor(0, 0, 255);
            else if (m === 0.5) doc.setDrawColor(255, 0, 0);
            else doc.setDrawColor(180, 180, 180);
            doc.line(x, sY + 2, x, sY - data.maxHeight - 5);
        });

        doc.setDrawColor(200);
        doc.line(sX, sY, sX + data.perimeter, sY);

        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        for (let i = 0; i < data.points.length - 1; i++) {
            const p1 = data.points[i];
            const p2 = data.points[i + 1];
            doc.line(sX + p1.x_flat, sY - p1.y_val, sX + p2.x_flat, sY - p2.y_val);
        }

        doc.save(`fishmouth_${p.branchDim}x${p.headerDim}_${p.angle}deg.pdf`);
    }
};
