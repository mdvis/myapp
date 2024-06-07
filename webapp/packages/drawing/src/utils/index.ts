function getElementRect(element: HTMLElement) {
  return (element as HTMLElement).getBoundingClientRect();
}

function getCanvasPoint(
  canvas:HTMLCanvasElement,
  point:number[],
) {
  const [x, y] = point;
  const { x: canvasX, y: canvasY } = getElementRect(canvas) as {x: number, y:number};
  return [x - canvasX, y - canvasY];
}

export default getCanvasPoint;
