import Context, { DrawingInstance } from '../interfaceCollection';

class Drawing {
  drawCanvas: HTMLCanvasElement;

  drawContext: Context;

  currentMode: String;

  constructor(drawCanvas:HTMLCanvasElement) {
    this.drawCanvas = <HTMLCanvasElement>drawCanvas;
    this.drawContext = <Context>drawCanvas.getContext('2d');
    this.currentMode = 'line';
  }

  size = ({ width, height }:{ width: number, height: number }) => {
    const { drawCanvas } = this;
    drawCanvas.width = width;
    drawCanvas.height = height;
  }

  bindEvent = () => {

  }

  init = (CurrentDrawing) => {
    const { drawCanvas, drawContext } = this;
    let handler: DrawingInstance;
    const bindMove = function move(e:any) {
      const { pageX, pageY } = e;
      handler.draw(pageX, pageY);
    };
    const bindUp = function up() {
      drawCanvas.removeEventListener('mousemove', bindMove, false);
      drawCanvas.removeEventListener('mouseup', bindUp, false);
    };
    const bindDown = function down(e:any) {
      const { pageX, pageY } = e;
      handler = new CurrentDrawing(drawContext, [pageX, pageY]);
      drawCanvas.addEventListener('mousemove', bindMove, false);
      drawCanvas.addEventListener('mouseup', bindUp, false);
    };
    drawCanvas.addEventListener('mousedown', bindDown, false);
    window.addEventListener('resize', () => {
      drawCanvas.width = document.body.clientWidth;
      drawCanvas.height = document.body.clientHeight;
    }, false);
    window.addEventListener('mouseout', () => {
      drawCanvas.removeEventListener('mousemove', bindMove, false);
      drawCanvas.removeEventListener('mouseup', bindUp, false);
    }, false);
  }
}

export default Drawing;
