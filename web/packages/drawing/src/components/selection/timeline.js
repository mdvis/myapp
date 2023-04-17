/**
 * name: timeline.js
 * author: Deve
 * date: 2021-04-20
 */

import { getCanvasPoint, getElementRect, getRatioValue } from 'utils';
import myEvt from 'utils/event';
import Calendar from './calendar';
import ICanvas from './canvas';
import initConf from './config';
import Layout from './layout';
import Scale from './scale';

function getRectWidth(container) {
    const { width } = getElementRect(container);
    return width;
}

function inPath([x, y], context) {
    return context.inPath([getRatioValue(x), getRatioValue(y)]);
}

const ORIGIN_POINT = [0, 0];
const myCanvas = ICanvas.getInstance();

class Timeline {
    constructor({
        container,
        data,
        onClick,
        config,
    }) {
        const newConf = { ...initConf, ...config };

        this.data = data;
        this.config = newConf;
        this.onClick = onClick;
        this.currentPoint = ORIGIN_POINT;
        this.container = container;
        this.context = myCanvas.getContext();
        this.layout = new Layout(newConf);
        this.scale = new Scale({
            config: newConf,
            context: myCanvas.getContext(),
        });
        this.linesPos = {};

        this.currentClick = this.currentClick.bind(this);
        this.drawDot = this.drawDot.bind(this);
        this.drawEntityLine = this.drawEntityLine.bind(this);
        this.drawEntityTitle = this.drawEntityTitle.bind(this);
        this.drawContent = this.drawContent.bind(this);
        this.render = this.render.bind(this);
        this.init = this.init.bind(this);
        this.addEvent = this.addEvent.bind(this);

        myEvt.on('updateEdges', (scaleValue, posMap) => {
            data.edges.forEach((item) => {
                const { target, source, date } = item;
                const targetIndex = scaleValue.indexOf(Calendar.getTime(date).format('YYYY-MM-DD'));
                if (targetIndex < 0) return;
                const targetStartY = this.linesPos[target][1];
                const targetStartX = posMap[targetIndex][0];

                const sourceStartY = this.linesPos[source][1];

                myCanvas
                    .drawLine(targetStartX, targetStartY, targetStartX, sourceStartY);
                const orient = (sourceStartY > targetStartY) ? 'down' : 'up';
                myCanvas.drawPointTriangle(targetStartX, sourceStartY, orient);
            });
        });
    }

    currentClick(item) {
        if (inPath(this.eventPos, myCanvas)) {
            this.onClick([item.id]);
        }
    }

    drawDot(x, y) {
        const { layout, context } = this;
        const RADIUS = 10;
        const START_RAD = 0;
        const endRad = 2 * Math.PI;

        context.beginPath();
        context.moveTo(...layout.getStartPoint(x, y));
        context.arc(...layout.getStartPoint(x, y), RADIUS, START_RAD, endRad);
        context.closePath();
        context.fill();
    }

    drawEntityLine(item) {
        const {
            layout,
            context: { canvas: { width, height } },
            data: { nodes },
            currentPoint: [x, y],
            config: { scaleHeight, entityTitleWidth, padding: [, right, bottom] },
        } = this;

        const deliv = (height - scaleHeight - getRatioValue(bottom)) / nodes.length;
        const contentStartX = x + entityTitleWidth;
        const contentStartY = y + deliv + scaleHeight;
        const contentEndX = x + (width - getRatioValue(right));
        const contentWidth = contentEndX - contentStartX;
        const CONTENT_HEIGHT = 1;
        const DIA = 4;

        const startPoint = layout.getStartPoint(contentStartX, contentStartY);
        this.linesPos[item.id] = startPoint;
        myCanvas.drawDot(...layout.getStartPoint(contentStartX, contentStartY), DIA);
        myCanvas.drawRectLine(
            ...startPoint,
            contentWidth,
            CONTENT_HEIGHT,
        );
        if (this.eventPos) {
            this.currentClick(item);
        }
        this.currentPoint = [x, y + deliv];
    }

    drawEntityTitle({ label }) {
        const {
            context,
            currentPoint: [x, y],
            config: { scaleHeight, entityTitleWidth },
            layout,
        } = this;

        const textStartX = x + entityTitleWidth;
        const textStartY = y + scaleHeight;

        context.font = '24px monospace';
        context.textAlign = 'right';
        context.fillText(label,
            ...layout.getStartPoint(textStartX, textStartY), entityTitleWidth);
    }

    drawContent() {
        const {
            data: { nodes },
        } = this;
        nodes.forEach((item) => {
            this.drawEntityLine(item);
            this.drawEntityTitle(item);
        });

        this.currentPoint = ORIGIN_POINT;
    }

    render(config = {}) {
        const { eventPos } = config;
        this.eventPos = eventPos;
        const newConf = { ...this.config, ...config };
        this.config = newConf;
        myCanvas.clearup(...ORIGIN_POINT);
        this.drawContent();
        myEvt.emit('drawScale');
    }

    init() {
        const {
            container,
            config: {
                width: confWidth,
                height: confHeight,
            },
        } = this;
        const canvas = myCanvas.createCanvas();
        const canvasWidth = confWidth || getRectWidth(container);

        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${confHeight}px`;
        canvas.width = getRatioValue(canvasWidth);
        canvas.height = getRatioValue(confHeight);

        if (container && canvas) {
            container.appendChild(canvas);
        }
    }

    addEvent() {
        const MOVE_DIST_VAL = 5;
        let moveStartX = 0;
        let startMove = false;
        let isMove = false;
        let oldClientX = 0;
        const { context: { canvas }, container } = this;

        myEvt.on('click', (e) => {
            this.render({ eventPos: getCanvasPoint(canvas, [e.clientX, e.clientY]) });
        });

        myEvt.on('mouseWheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            myEvt.emit('changeWheel', e.deltaY);
            this.render();
        });

        myEvt.on('mouseDown', (e) => {
            moveStartX = e.clientX;
            startMove = true;
        });

        myEvt.on('mouseMove', (e) => {
            if (startMove) {
                if (!isMove) {
                    const moveRange = e.clientX - moveStartX;
                    if (Math.abs(moveRange) > MOVE_DIST_VAL) {
                        isMove = true;
                        moveStartX = e.clientX;
                        oldClientX = e.clientX;
                    }
                }
                if (isMove) {
                    let origin;
                    if (e.clientX > oldClientX) origin = 'right';
                    if (e.clientX < oldClientX) origin = 'left';
                    container.style.cursor = 'move';
                    myEvt.emit('changeRange', origin);
                    this.render();
                }
            }
        });

        myEvt.on('mouseUp', () => {
            startMove = false;
            isMove = false;
            container.style.cursor = '';
        });
    }
}

Timeline.init = function init(conf) {
    const timeline = new Timeline(conf);
    timeline.init();
    timeline.addEvent();
    timeline.render();
    return timeline;
};

export default Timeline;
