/**
 * Т-квадрат
 *
 * @class
 * @implements {BaseFractal}
 */
class HFractal extends BaseFractal {
	constructor(x, y, scl) {
		super(x, y, scl)

		let halfOfScl = floor(scl / 6)
		let a = createVector(x - halfOfScl, y - halfOfScl)
		let c = createVector(x + halfOfScl, y + halfOfScl)

		this.halfOfScl = halfOfScl
		this.elements = [new HElement(a, c)]

		this.limit = 5
		this.step = 1
	}

	makeAStep(reversed) {
		if (this.step > this.limit) 
			return false
		reversed = reversed || false
		this.step++
		let next = []
		for (let i = 0; i < this.elements.length; i++) {
			let element = this.elements[i]
			element.step = i
			next.push(element)

			let a
			let c

			a = new p5.Vector(element.A.x - element.offset, element.A.y - element.offset)
			c = new p5.Vector(element.A.x + element.offset, element.A.y + element.offset)
			next.push(new HElement(a, c))

			a = new p5.Vector(element.B.x - element.offset, element.B.y - element.offset)
			c = new p5.Vector(element.B.x + element.offset, element.B.y + element.offset)
			next.push(new HElement(a, c))

			a = new p5.Vector(element.C.x - element.offset, element.C.y - element.offset)
			c = new p5.Vector(element.C.x + element.offset, element.C.y + element.offset)
			next.push(new HElement(a, c))

			a = new p5.Vector(element.D.x - element.offset, element.D.y - element.offset)
			c = new p5.Vector(element.D.x + element.offset, element.D.y + element.offset)
			next.push(new HElement(a, c))
		}
		this.elements = next
		return true
	}

	draw() {
		fill(0)
		for (let i = 0; i < this.elements.length; i++) {
			let element = this.elements[i]
			beginShape(LINES)
			
			vertex(element.A.x, element.A.y)
			vertex(element.D.x, element.D.y)

			vertex(element.B.x, element.B.y)
			vertex(element.C.x, element.C.y)

			vertex(element.E.x, element.E.y)
			vertex(element.F.x, element.F.y)

			endShape(CLOSE)
		}
	}
}

class HElement {
	/**
	 * @constructor
	 * @param  {p5.Vector}  start  - Точка начала
	 * @param  {p5.Vector}  end    - Точка конца
	 */
	constructor(start, end) {
		this.start = start
		this.end = end

		this.offset = p5.Vector.sub(this.B, this.A).div(4).x
	}
	get A() {
		return this.start
	}
	get B() {
		return new p5.Vector(this.end.x, this.start.y)
	}
	get C() {
		return this.end
	}
	get reversedC() {
		return this.end
	}
	get D() {
		return new p5.Vector(this.start.x, this.end.y)
	}
	get E() {
		return p5.Vector.sub(this.A, this.D).div(2).add(this.D)
	}
	get F() {
		return p5.Vector.sub(this.B, this.C).div(2).add(this.C)
	}
}
