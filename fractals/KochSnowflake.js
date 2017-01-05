/**
 * Снежинка коха
 *
 * @class
 * @implements {BaseFractal}
 */
class KochSnowflake extends BaseFractal {
	constructor(x, y, scl) {
		super(x, y, scl)

		this.lines = []

		let halfOfScl = floor(scl / 2)
		let a = createVector(x - halfOfScl, y + halfOfScl)
		let b = createVector(x, y - halfOfScl / 1.36)
		let c = createVector(x + halfOfScl, y + halfOfScl)

		this.lines.push(new KochLine(a, b))
		this.lines.push(new KochLine(b, c))
		this.lines.push(new KochLine(c, a))

		this.limit = 5
		this.step = 1
	}

	makeAStep(reversed) {
		if (this.step > this.limit) 
			return false
		reversed = reversed || false
		this.step++
		let next = []
		for (let i = 0; i < this.lines.length; i++) {
			let a = this.lines[i].A
			let b = this.lines[i].B
			let c = (!reversed) ? this.lines[i].C : this.lines[i].reversedC
			let d = this.lines[i].D
			let e = this.lines[i].E
			next.push(new KochLine(a, b))
			next.push(new KochLine(b, c))
			next.push(new KochLine(c, d))
			next.push(new KochLine(d, e))
		}
		this.lines = next
		return true
	}

	draw() {
		noFill()
		beginShape(LINES)
		for (let i = 0; i < this.lines.length; i++) {
			let line = this.lines[i]

			vertex(line.start.x, line.start.y)
			vertex(line.end.x, line.end.y)
		}
		endShape(CLOSE)
	}
}

class KochLine {
	/**
	 * @constructor
	 * @param  {p5.Vector}  start  - Точка начала
	 * @param  {p5.Vector}  end    - Точка конца
	 */
	constructor(start, end) {
		this.start = start
		this.end = end
	}
	get A() {
		return this.start
	}
	get B() {
		return p5.Vector.sub(this.end, this.start).div(3).add(this.start)
	}
	get C() {
		let c = this.start.copy()
		let v = p5.Vector.sub(this.end, this.start)
		v.div(3)
		c.add(v)
		v.rotate(-radians(60))
		return c.add(v)
	}
	get reversedC() {
		let c = this.start.copy()
		let v = p5.Vector.sub(this.end, this.start)
		v.div(3)
		c.add(v)
		v.rotate(radians(60))
		return c.add(v)
	}
	get D() {
		return p5.Vector.sub(this.start, this.end).div(3).add(this.end)
	}
	get E() {
		return this.end
	}
}
