/**
 * name: index.jsx
 * author: Deve
 * date: 2021-05-18
 */

import { getElementRect, getRatioValue } from 'utils';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ICanvas, { getCanvasPoint } from '@WLH/i-canvas';
import throttle from 'lodash/throttle';
import './selection.scss';

const myCanvas = ICanvas.getInstance();
const container = React.createRef();
const shapePoints = [];
let drawing = false;
const H = 400;

function Selection({ children, getSelectedNodes }) {
    useEffect(() => {
        console.log('selection');
        const { width } = getElementRect(container.current);
        const canvas = myCanvas.createCanvas();
        canvas.width = getRatioValue(width);
        canvas.height = getRatioValue(H);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${H}px`;
        container.current.append(canvas);

        const context = myCanvas.getContext();

        const drawShape = () => {
            context.clearRect(0, 0, getRatioValue(width), getRatioValue(H));
            if (shapePoints.length < 2) return;
            if (drawing) return;
            drawing = true;
            context.fillStyle = 'rgba(61,132,184, .5)';
            context.strokeStyle = 'rgba(61,132,184, 0)';
            context.beginPath();
            shapePoints.forEach((item, index) => {
                if (index === 0) {
                    context.moveTo(...item);
                } else {
                    context.lineTo(...item);
                }
            });
            context.closePath();
            context.stroke();
            context.fill();
            drawing = false;
        };
        const moveHandler = throttle((e) => {
            const [x, y] = getCanvasPoint(canvas, [e.clientX, e.clientY]);
            shapePoints.push([x * 2, y * 2]);
            drawShape();
        }, 50);
        canvas.addEventListener('mousedown', () => {
            canvas.addEventListener('mousemove', moveHandler, false);
        }, false);
        canvas.addEventListener('mouseup', () => {
            if (typeof getSelectedNodes === 'function') {
                getSelectedNodes(myCanvas.inPath);
            }
            shapePoints.length = 0;
            canvas.removeEventListener('mousemove', moveHandler, false);
            context.clearRect(0, 0, getRatioValue(width), getRatioValue(H));
        }, false);
    }, []);
    return (
        <div ref={container} className="i-canvas-container">
            { children }
        </div>
    );
}

Selection.propTypes = {
    children: PropTypes.node.isRequired,
    getSelectedNodes: PropTypes.func.isRequired,
};

export default Selection;
