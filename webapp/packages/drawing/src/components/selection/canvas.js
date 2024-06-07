/**
 * name: canvas.js
 * author: Deve
 * date: 2021-04-19
 */
import myEvt from 'utils/event';
import throttle from 'lodash/throttle';

const THROTTLE_TIME = 100;

class ICanvas {
    constructor() {
        this.context = null;
        this.canvas = this.createCanvas();

        this.clearup = this.clearup.bind(this);
        this.createCanvas = this.createCanvas.bind(this);
        this.clearup = this.clearup.bind(this);
        this.createCanvas = this.createCanvas.bind(this);
        this.getContext = this.getContext.bind(this);
        this.inPath = this.inPath.bind(this);
        this.drawRectLine = this.drawRectLine.bind(this);
        this.drawDot = this.drawDot.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.write = this.write.bind(this);
    }

    clearup(x = 0, y = 0, w, h) {
        const {
            context,
            context: { canvas: { width, height } },
        } = this;

        context.clearRect(x, y, w || width, h || height);
    }

    createCanvas() {
        const { canvas } = this;

        if (canvas) return canvas;

        this.canvas = document.createElement('canvas');
        return this.canvas;
    }

    getContext() {
        const { context, createCanvas } = this;

        if (context) return context;

        const canvas = createCanvas();
        this.context = canvas.getContext('2d');
        return this.context;
    }

    inPath([x, y], path) {
        const context = this.getContext();
        if (path) {
            return context.isPointInPath(path, x, y)
                || context.isPointInStroke(path, x, y);
        }
        return context.isPointInPath(x, y) || context.isPointInStroke(x, y);
    }

    drawPointTriangle(x, y, orient = 'up', w = 2, c = '#000') {
        const { context } = this;
        const DIFF = 6;
        const map = {
            up: (originX, originY) => {
                context.lineTo(originX - DIFF, originY + DIFF);
                context.lineTo(originX + DIFF, originY + DIFF);
            },
            down: (originX, originY) => {
                context.lineTo(originX - DIFF, originY - DIFF);
                context.lineTo(originX + DIFF, originY - DIFF);
            },
            left: (originX, originY) => {
                context.lineTo(originX - DIFF, originY - DIFF);
                context.lineTo(originX - DIFF, originY + DIFF);
            },
            right: (originX, originY) => {
                context.lineTo(originX + DIFF, originY - DIFF);
                context.lineTo(originX + DIFF, originY + DIFF);
            },
        };
        context.lineWidth = w;
        context.strokeStyle = c;
        context.beginPath();
        context.moveTo(x, y);
        map[orient](x, y);
        context.closePath();
        context.stroke();
        context.fill();
    }

    drawRectLine(x, y, w, h, c = '#000') {
        const { context } = this;
        context.lineWidth = 10;
        context.strokeStyle = 'rgba(255,0,0,0)';
        context.fillStyle = c;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
        context.fill();
    }

    drawDot(x, y, r, c = '#000') {
        const { context } = this;
        context.lineWidth = 1;
        context.strokeStyle = c;
        context.fillStyle = c;
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.stroke();
        context.fill();
    }

    drawLine(x, y, x1, y1, w = 2, c = '#000') {
        const { context } = this;
        context.lineWidth = w;
        context.strokeStyle = c;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x1, y1);
        context.closePath();
        context.stroke();
    }

    write({
        font = '24px monospace',
        textAlign = 'left',
        text = 'text',
        point = [0, 0],
        width = 40,
    }) {
        const { context } = this;
        context.font = font;
        context.textAlign = textAlign;
        context.fillText(
            text,
            ...point,
            width,
        );
    }

    initEvent() {
        const { canvas } = this;
        if (canvas) {
            canvas.addEventListener('click', (evt) => {
                myEvt.emit('click', evt);
            }, false);

            canvas.addEventListener('mousewheel', throttle((evt) => {
                myEvt.emit('mouseWheel', evt);
            }, THROTTLE_TIME), false);

            canvas.addEventListener('mouseup', (evt) => {
                myEvt.emit('mouseUp', evt);
            }, false);

            canvas.addEventListener('mouseout', (evt) => {
                myEvt.emit('mouseUp', evt);
            }, false);

            canvas.addEventListener('mousemove', throttle((evt) => {
                myEvt.emit('mouseMove', evt);
                myEvt.emit('hover', evt);
            }, THROTTLE_TIME), false);

            canvas.addEventListener('mousedown', (evt) => {
                myEvt.emit('mouseDown', evt);
            }, false);
        }
    }
}

ICanvas.getInstance = function getInstance() {
    let { instance } = ICanvas;
    if (instance) return instance;
    instance = new ICanvas();
    instance.initEvent();
    ICanvas.instance = instance;
    return instance;
};

export default ICanvas;
