import React from 'react';
import { render } from 'react-dom';
import CanvasBoard from './canvas-board';
import Drawing from './drawing';
import Dock from './dock';
import Line from './line';

import 'common/styles/index.scss';

class CanvasWrapper extends React.Component {
  canvasElement:HTMLCanvasElement | null;

  drawingInstance: Drawing | null;

  constructor(props:any) {
    super(props);
    this.canvasElement = null;
    this.drawingInstance = null;
  }

  componentDidMount() {
    const { canvasElement } = this;
    if (canvasElement) {
      this.drawingInstance = new Drawing(canvasElement);
      this.drawingInstance.size({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      });
      this.drawingInstance.init(Line);
    }
  }

  getCanvasElement = (canvasElement:HTMLCanvasElement) => {
    this.canvasElement = canvasElement;
  }

  render() {
    const { getCanvasElement } = this;
    return (
      <div>
        <CanvasBoard
          getCanvasElement={getCanvasElement}
        />
        <Dock />
      </div>
    );
  }
}

render(
  <CanvasWrapper />,
  document.getElementById('root'),
);
