# Fishmouth - Generador de Plantillas de Corte de Tubería

Herramienta profesional para ingenieros y soldadores que permite generar plantillas de corte (unwrapped templates) para uniones de tuberías en diferentes configuraciones.

## Características

-   **Precisión Geométrica**: Cálculos trigonométricos exactos para intersecciones Cilindro-Cilindro, Prisma-Cilindro y variaciones cuadradas.
-   **Interfaz Moderna**: Desarrollado con Tailwind CSS para una experiencia de usuario premium.
-   **Escala 1:1**: Generación de archivos PDF en tamaño A4 diseñados para ser impresos y utilizados directamente sobre el material (Escala Real).
- [x] **Visualización en tiempo real**: Previsualización instantánea del desarrollo plano con marcas de referencia integradas.
- [x] **Estabilidad Mejorada**: Corregido bug de inicialización (race condition) que afectaba la carga inicial del renderizador.

## Requerimientos

-   Navegador moderno (Chrome, Edge, Firefox, Safari).
-   Conexión a internet para cargar Tailwind CSS (vía CDN) y jsPDF.

## Verificación de Escala 1:1

La lógica de exportación en `pdf.js` utiliza unidades `mm` directamente en la librería `jsPDF`:
```javascript
const doc = new jsPDF({
    orientation: orientation,
    unit: 'mm',
    format: 'a4'
});
```
Esto asegura que cada unidad definida en el código se traduzca exactamente a un milímetro físico en la hoja impresa, siempre que el usuario seleccione **"Tamaño Real"** en su configuración de impresión.

## Vista Previa de la Aplicación

![Interfaz de Fishmouth](file:///Users/sector7gp/.gemini/antigravity/brain/bf2e05d9-03cc-4d33-8198-4935b47d4bb4/fishmouth_app_state_1772403631174.png)

## Cómo Probar (Importante)

**Nota**: Al usar JavaScript Modules, necesitas un servidor local para abrirlo (no funcionará con doble clic directo al archivo por políticas de seguridad del navegador).

1. Abre una terminal en la carpeta `fishmouth`.
2. Ejecuta `python3 -m http.server 8000` o `npx serve`.
3. Navega a `http://localhost:8000` (o el puerto indicado).

## Uso

1.  Ingresa las dimensiones del tubo a cortar (**Branch**) y del tubo base (**Header**).
2.  Ajusta el **Ángulo de Intersección** (de 10° a 90°).
3.  Observa el desarrollo en el panel central.
    -   **Línea Roja**: Lomo / Pico máximo (Centro).
    -   **Líneas Azules**: Cierres o extremos del papel.
    -   **Líneas Grises**: Ejes laterales a 90°.
5.  Haz clic en **"Generar PDF para Imprimir (1:1)"**.
6.  **IMPORTANTE**: Al imprimir el PDF, asegúrate de seleccionar **"Tamaño Real"** o **"Escala 100%"** en la configuración de la impresora (NO usar "ajustar a la página").

## Estructura del Proyecto

-   `index.html`: Estructura y estilos de la SPA.
-   `js/app.js`: Controlador principal de la aplicación.
-   `js/math.js`: Lógica trigonométrica de intersecciones.
-   `js/renderer.js`: Dibujo en el `<canvas>` del navegador.
-   `js/pdf.js`: Generación de PDF a escala real con `jsPDF`.

## Fórmulas Utilizadas

Para intersecciones cilíndricas, se utiliza la proyección de la intersección de dos cilindros:
`z = (r2² - (r1 * sin(φ))²)^0.5 / sin(θ) - (r1 * cos(φ)) / tan(θ)`

Donde:
- `r1`: Radio del tubo branch.
- `r2`: Radio del tubo header.
- `φ`: Ángulo de rotación sobre el perímetro del tubo branch.
- `θ`: Ángulo de intersección de los ejes.

---
© 2026 Fishmouth Tool &bull; Desarrollado por Antigravity AI
