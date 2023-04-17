/**
 * name: layout.js
 * author: Deve
 * date: 2021-04-29
 */

class Layout {
    constructor(config) {
        this.config = config;
        this.getStartPoint = this.getStartPoint.bind(this);
        this.getEndPoint = this.getEndPoint.bind(this);
    }

    getStartPoint(x = 0, y = 0) {
        const { config: { padding: [top, , , left] } } = this;
        return [x + left, y + top];
    }

    getEndPoint(x, y) {
        const { config: { padding: [top, , , left] } } = this;
        return [x - left, y - top];
    }
}

export default Layout;
