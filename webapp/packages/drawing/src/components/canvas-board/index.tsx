import React from 'react';
import './canvas-board.scss';

interface Props {
  getCanvasElement:Function;
}

class CanvasBoard extends React.Component<Props, {}> {
  canvasElement = React.createRef<HTMLCanvasElement>()

  componentDidMount() {
    const {
      canvasElement,
      props: { getCanvasElement },
    } = this;
    getCanvasElement(canvasElement.current);
  }

  toImg = () => {
    const { current } = this.canvasElement;
    if (current) {
      current.toDataURL('image/png', 1.0);
    }
  }

  render() {
    return (
      <canvas
        id="draw"
        ref={this.canvasElement}
      />
    );
  }
}

export default CanvasBoard;
