export default interface Context {
    fillStyle:string;
    strokeStyle:string;
    shadowBlur:number;
    shadowColor:string;
    arc:Function;
    fill:Function;
    beginPath:Function;
    closePath:Function;
    rotate:Function;
    translate:Function;
    fillRect:Function;
    clearRect:Function;
    lineTo:Function;
    moveTo:Function;
    stroke:Function;
    drawImage:Function;
}

export interface LineContext {
    strokeStyle:string;
    beginPath:Function;
    moveTo:Function;
    lineTo:Function;
    stroke:Function;
}

export interface ImageContext {
    fillStyle:string;
    shadowBlur:number;
    shadowColor:string;
    arc:Function;
    fill:Function;
    closePath:Function;
    rotate:Function;
    translate:Function;
    fillRect:Function;
    clearRect:Function;
    drawImage:Function;
}

export interface DrawingInstance {
  addPoint: Function;
  draw: Function;
  handle: Function;
}
