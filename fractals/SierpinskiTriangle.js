/**
 * Треугольник серпинского
 *
 * @class
 * @implements {BaseFractal}
 */
class SierpinskiTriangle extends BaseFractal {
	constructor(x, y, scl) {
		super(x, y, scl)

		this.limit = 9
	}

	doFirstStep() {
		this.step = 1

		let halfOfScl = floor(this.scl / 2)
		let a = createVector(-halfOfScl, this.y + halfOfScl)
		let c = createVector(halfOfScl, this.y + halfOfScl)

		this.halfOfScl = halfOfScl
		this.triangles = [new STriangle(a, c)]
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
		for (let i = 0; i < this.triangles.length; i++) {
			let triangle = this.triangles[i]
			triangle.step = i
			let a 
			let c
			
			a = triangle.A
			c = triangle.D
			next.push(new STriangle(a, c))
			
			a = triangle.E
			c = triangle.F
			next.push(new STriangle(a, c))

			a = triangle.D
			c = triangle.C
			next.push(new STriangle(a, c))
		}
		this.triangles = next
		return true
	}

	draw() {
    console.log('drawing SierpinskiTriangle')
		fill(0)
		noStroke()
		let xOffset = this.x / 1.5
		for (let i = 0; i < this.triangles.length; i++) {
			let triangle = this.triangles[i]
			beginShape()
			vertex(xOffset + triangle.A.x, triangle.A.y)
			vertex(xOffset + triangle.B.x, triangle.B.y)
			vertex(xOffset + triangle.C.x, triangle.C.y)
			endShape(CLOSE)
		}
	}
}

class STriangle {
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

		let b = this.start.copy()
		let v = p5.Vector.sub(this.end, this.start)
		b.add(v)
		v.rotate(-radians(120))

		return b.add(v)
	}
	get C() {
		return this.end
	}
	get reversedC() {
		return this.end
	}
	get D() {
		let d = this.start.copy()
		let v = p5.Vector.sub(this.end, this.start)
		v.div(2)
		return d.add(v)
	}
	get E() {
		let e = this.start.copy()
		let v = p5.Vector.sub(this.B, this.start)
		v.div(2)
		return e.add(v)
	}
	get F() {
		let f = this.end.copy()
		let v = p5.Vector.sub(this.B, this.end)
		v.div(2)
		return f.add(v)
	}
}
