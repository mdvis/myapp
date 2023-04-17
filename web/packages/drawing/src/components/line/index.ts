import Context from '../interfaceCollection';

class Line {
  ctx: Context;

  color: string;

  points:Array<Array<number>>;

  constructor(ctx:Context, point:Array<number>, color = '#000') {
    this.ctx = ctx;
    this.points = [point];
    this.color = color;
  }

  addPoint = (point:Array<number>) => {
    this.points.push(point);
  }

  draw = (pageX: number, pageY: number) => {
    this.addPoint([pageX, pageY]);
    this.handle();
  }

  handle = () => {
    const { ctx, points, color } = this;
    const [startPoint, ...restPoints] = points;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(...startPoint);
    restPoints.forEach((_point) => { ctx.lineTo(..._point); });
    ctx.stroke();
  }
}

export default Line;
