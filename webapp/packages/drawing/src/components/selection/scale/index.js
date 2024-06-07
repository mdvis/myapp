/**
 * name: scale.js
 * author: Deve
 * date: 2021-04-29
 */

import myEvt from 'utils/event';
import Layout from '../layout';
import Calendar from '../calendar';
import { drawBaseLine, drawDivScale, write } from './scale';

const TIME_FORMAT = 'YYYY-MM-DD';
const SCALE_START_AXIS_Y = 20;
const SCALE_TEXT_START_AXIS_Y = 36;

function getDividerWidth(list, width) {
    return width / (list.length - 1);
}

function getContentWidth(width, config) {
    const { padding: [, right, , left] } = config;
    return width - (left + right);
}

class Scale {
    constructor({ context, config }) {
        function initScaleValue(curTime, timeType) {
            const tmp = [];
            const count = Calendar.getMonthDay(curTime[timeType]);
            for (let i = 1; i <= count; i += 1) {
                tmp.push(
                    Calendar
                        .getTime(`${curTime.year}-${curTime.month + 1}-${i}`)
                        .format(TIME_FORMAT),
                );
            }
            return tmp;
        }
        const timeType = 'date';
        const layout = new Layout(config);
        const initTime = new Calendar();
        const curTime = {
            year: initTime.year(),
            month: initTime.month(),
            date: initTime.date(),
        };
        const scaleValue = initScaleValue(curTime, timeType);

        this.timeType = timeType;
        this.context = context;
        this.config = config;
        this.layout = layout;
        this.startPoint = layout.getStartPoint(0, config.scaleHeight);
        this.scaleValue = scaleValue;

        this.drawScale = this.drawScale.bind(this);

        myEvt.on('changeRange', (origin) => {
            if (!origin) return;
            function add() {
                const last = scaleValue[scaleValue.length - 1];
                scaleValue.shift();
                scaleValue.push(
                    Calendar
                        .getTime(last)
                        .add(1, 'days')
                        .format(TIME_FORMAT),
                );
            }
            function subtract() {
                const first = scaleValue[0];
                scaleValue.pop();
                scaleValue.unshift(
                    Calendar
                        .getTime(first)
                        .subtract(1, 'days')
                        .format(TIME_FORMAT),
                );
            }
            const map = { left: add, right: subtract };
            map[origin]();
        });

        myEvt.on('changeWheel', (deltaY = 0) => {
            if (deltaY < 0) {
                this.scaleValue.pop();
                this.scaleValue.shift();
            }
            if (deltaY > 0) {
                const last = scaleValue[scaleValue.length - 1];
                const first = scaleValue[0];
                this.scaleValue.push(
                    Calendar
                        .getTime(last)
                        .add(1, 'days')
                        .format(TIME_FORMAT),
                );
                this.scaleValue.unshift(
                    Calendar
                        .getTime(first)
                        .subtract(1, 'days')
                        .format(TIME_FORMAT),
                );
            }
        });

        myEvt.on('drawScale', () => {
            this.drawScale();
        });

        myEvt.on('hover', () => {
            console.log('hover');
        });
    }

    drawScale() {
        const {
            config: { scaleHeight }, config,
            layout, scaleValue,
            context: { canvas: { width: canvasWidth } },
        } = this;
        const contentWidth = getContentWidth(canvasWidth, config);
        const initPoint = layout.getStartPoint(0, scaleHeight);
        const dividerWidth = getDividerWidth(scaleValue, contentWidth);
        const posMap = [];

        scaleValue.forEach((item, ind) => {
            const xp = (ind * dividerWidth);
            const ori = Calendar.getTime(item);
            const cur = ori.format('DD');
            const sup = ori.format('MMM');
            const startPoint = layout.getStartPoint(xp, SCALE_START_AXIS_Y);
            posMap.push(startPoint);
            if (Number(cur) !== 1) startPoint[1] += 40;
            drawDivScale(
                startPoint,
                layout.getStartPoint(xp, scaleHeight),
                layout.getStartPoint(xp, SCALE_TEXT_START_AXIS_Y + 40),
                `${cur}`,
            );
            if (Number(cur) === 1) {
                write(
                    `${sup}`,
                    layout.getStartPoint(xp, SCALE_TEXT_START_AXIS_Y),
                );
            }
        });

        myEvt.emit('updateEdges', scaleValue, posMap);

        drawBaseLine(
            initPoint,
            layout.getStartPoint(contentWidth, scaleHeight),
        );
    }
}

export default Scale;
