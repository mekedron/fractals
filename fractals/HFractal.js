/**
 * Т-квадрат
 *
 * @class
 * @implements {BaseFractal}
 */
class HFractal extends BaseFractal {
	constructor(x, y, scl) {
		super(x, y, scl)

		this.limit = 6
	}

	doFirstStep() {
		this.step = 1

		let halfOfScl = floor(this.scl / 6)
		let a = createVector(-halfOfScl, this.y - halfOfScl)
		let c = createVector(halfOfScl, this.y + halfOfScl)

		this.halfOfScl = halfOfScl
		this.elements = [new HElement(a, c)]

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
    console.log('drawing HFractal')
    stroke(1)
		fill(0)
		let xOffset = this.x / 1.5
		for (let i = 0; i < this.elements.length; i++) {
			let element = this.elements[i]
			beginShape(LINES)
			
			vertex(xOffset + element.A.x, element.A.y)
			vertex(xOffset + element.D.x, element.D.y)

			vertex(xOffset + element.B.x, element.B.y)
			vertex(xOffset + element.C.x, element.C.y)

			vertex(xOffset + element.E.x, element.E.y)
			vertex(xOffset + element.F.x, element.F.y)

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
