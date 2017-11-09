import BezierEasing from 'bezier-easing';

// Circle animation duration
const DURATION = 300;

// Starting radius
const MIN_RADIUS = 10;

// When circle become filled
const STROKE_FILL_BOUNDARY = 35;

// Easing from matrial
const easing = BezierEasing(0.6, 0.04, 0.98, 0.335);

// Growing circle on a canvas.
// Starts in (x, y) point with initial progress.
class Circle {
    constructor(canvas, x, y, progress) {
        this._canvas = canvas;
        this._center = { x, y };
        this._progress = progress;

        // Calculate max radius for canvas in point (x, y)
        const width = Math.max(x, canvas.width - x);
        const height = Math.max(y, canvas.height - y);
        this._maxRadius = Math.sqrt(width * width + height * height);

        // Init
        this._prevTimestamp = 0;
    }

    // Draw itself
    _draw() {
        const ctx = this._canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        if (this._progress === 0) {
            return;
        }

        const r = MIN_RADIUS + easing(this._progress) * (this._maxRadius - MIN_RADIUS);

        // Draw the circle
        ctx.beginPath();
        ctx.arc(this._center.x, this._center.y, r, 0, 2 * Math.PI);
        if (r < STROKE_FILL_BOUNDARY) {
            ctx.strokeStyle = 'white';
            ctx.stroke();
        } else {
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    // Make next step
    _tick(timestamp) {
        if (!this._prevTimestamp) {
            // First step
            this._prevTimestamp = timestamp;

            return 0;
        }

        const step = (timestamp - this._prevTimestamp) / DURATION;
        this._prevTimestamp = timestamp;

        return step;
    }

    // Move animation forward. Return false and resets if finished.
    expand(timestamp) {
        if (this._progress === 1) {
            this._prevTimestamp = 0;
            return false;
        }

        this._progress += this._tick(timestamp);
        if (this._progress > 1) {
            this._progress = 1;
        }

        this._draw();

        return true;
    }

    // Move animation back. Return false and resets if finished.
    collapse(timestamp) {
        if (this._progress === 0) {
            this._prevTimestamp = 0;
            return false;
        }

        this._progress -= this._tick(timestamp);
        if (this._progress < 0) {
            this._progress = 0;
        }

        this._draw();

        return true;
    }
}

export default Circle;
