/**
 * Снежинка коха
 *
 * @class
 * @implements {BaseFractal}
 */
class KochSnowflake extends BaseFractal {
	constructor(x, y, scl) {
		super(x, y, scl)

		this.limit = 7
	}

	doFirstStep() {
		this.step = 1

		let halfOfScl = floor(this.scl / 2)
		let a = createVector(-halfOfScl, this.y + halfOfScl)
		let b = createVector(0, this.y - halfOfScl / 1.36)
		let c = createVector(halfOfScl, this.y + halfOfScl)

		this.els.push(new KochLine(a, b))
		this.els.push(new KochLine(b, c))
		this.els.push(new KochLine(c, a))
	}

	makeAStep(reversed) {
		if (!this.step) {
			this.doFirstStep()
			return true
		}
		if (this.step > this.limit) 
			return false
		reversed = reversed || false
		this.step++
		let next = []
		for (let i = 0; i < this.els.length; i++) {
			let a = this.els[i].A
			let b = this.els[i].B
			let c = (!reversed) ? this.els[i].C : this.els[i].reversedC
			let d = this.els[i].D
			let e = this.els[i].E
			next.push(new KochLine(a, b))
			next.push(new KochLine(b, c))
			next.push(new KochLine(c, d))
			next.push(new KochLine(d, e))
		}
		this.els = next
		return true
	}

	draw() {
    console.log('drawing KochSnowflake')
    stroke(1)
		noFill()
		let xOffset = this.x / 1.5
		for (let i = 0; i < this.els.length; i++) {
			let el = this.els[i]

			line(xOffset  + el.start.x, el.start.y, xOffset + el.end.x, el.end.y)
		}
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
