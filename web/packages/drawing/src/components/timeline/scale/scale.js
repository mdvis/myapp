/**
 * name: scale.js
 * author: Deve
 * date: 2021-05-12
 */

import ICanvas from '@WLH/i-canvas';

const myCanvas = ICanvas.getInstance();

export function drawBaseLine(startPoint, endPoint) {
    myCanvas.drawLine(
        ...startPoint,
        ...endPoint,
    );
}

export function drawDivScale(startPoint, endPoint, textPoint, text) {
    myCanvas.drawLine(
        ...startPoint,
        ...endPoint,
        undefined,
        '#d0d0d0',
    );

    myCanvas.write({
        text,
        point: textPoint,
        width: 30,
    });
}

export function write(text, point) {
    myCanvas.write({
        text,
        point,
        width: 30,
    });
}
