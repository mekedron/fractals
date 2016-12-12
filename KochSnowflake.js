class KochSnowflake extends BaseFractal {

    constructor(x, y, scl) {
        super(x, y, scl);

        this.lines = [];

        let halfOfScl = scl / 2;
        let a = new p5.Vector(x - halfOfScl, y + halfOfScl);
        let b = new p5.Vector(x, y - halfOfScl);
        let c = new p5.Vector(x + halfOfScl, y + halfOfScl);

        this.lines.push(new KochLine(a, b));
        this.lines.push(new KochLine(b, c));
        this.lines.push(new KochLine(c, a));
    }

	draw() {
		//this._drawPart(this.x - this.x / 4, this.y - this.y / 4, this.scl, step);
		//
        for(let i = 0; i < this.lines.length; i++) {
            line(this.lines[i].start.x,
                 this.lines[i].start.y,
                 this.lines[i].end.x,
                 this.lines[i].end.y);
        }
	}

    nextStep() {
        let next = [];
        for(let i = 0; i < this.lines.length; i++) {
            let a = this.lines[i].a;
            let b = this.lines[i].b;
            let c = this.lines[i].c;
            let d = this.lines[i].d;
            let e = this.lines[i].e;
            next.push(new KochLine(a, b));
            next.push(new KochLine(b, c));
            next.push(new KochLine(c, d));
            next.push(new KochLine(d, e));
        }
        this.lines = next;
    }

	/**
	 * Орисовать рекурсивно фрактал до конкретного шага
	 * @param  {float}  x            - Позиция по иксу
	 * @param  {float}  y            - Позиция по игрку
     * @param  {float}  scl          - Масштаб
	 * @param  {int}    step         - Итоговый шаг
	 * @param  {int}    _currentStep - Шаг рекурсии, не задаётся (от нуля до step)
	 * @return {undefined}           - Нарисованная часть фрактала на позиции x и y
	 */
	_drawPart(x, y, scl, step, _currentStep) {
		/*_currentStep = _currentStep || 0;

		rect(x, y, x + scl, y + scl);

		if (_currentStep < step)
			this._drawPart(x - scl, y - scl, scl / 2, step, _currentStep + 1);*/
	}
}

class KochLine {
    /**
     * @constructor
     * @param  {p5.Vector}  start  - Точка начала
     * @param  {p5.Vector}  end    - Точка конца
     */
    constructor(start, end) {
        this.start  = start;
        this.end    = end;
    }
    get a() {
        return this.start.copy();
    }
    get b() {
        return p5.Vector.sub(this.end, this.start).div(3).add(this.start);
    }
    get c() {
        let c = this.start.copy();
        let v = p5.Vector.sub(this.end, this.start);
        v.div(3);
        c.add(v);
        v.rotate(-radians(60));
        return c.add(v);

    }
    get d() {
        return p5.Vector.sub(this.start, this.end).div(3).add(this.end);
    }
    get e() {
        return this.end.copy();
    }
}
