/**
 * Треугольник серпинского
 *
 * @class
 * @implements {BaseFractal}
 */
class SierpinskiTriangle extends BaseFractal {
	constructor(x, y, scl) {
		super(x, y, scl)

		let halfOfScl = floor(scl / 2)
		let a = createVector(x - halfOfScl, y + halfOfScl)
		let c = createVector(x + halfOfScl, y + halfOfScl)

		this.halfOfScl = halfOfScl
		this.triangles = [new TElement(a, c)]

		this.limit = 5
		this.step = 1
	}

	makeAStep(reversed) {
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
			next.push(new TElement(a, c))
			
			a = triangle.E
			c = triangle.F
			next.push(new TElement(a, c))

			a = triangle.D
			c = triangle.C
			next.push(new TElement(a, c))
		}
		this.triangles = next
		return true
	}

	draw() {
		fill(0)
		noStroke
		for (let i = 0; i < this.triangles.length; i++) {
			let triangle = this.triangles[i]
			beginShape()
			vertex(triangle.A.x, triangle.A.y)
			vertex(triangle.B.x, triangle.B.y)
			vertex(triangle.C.x, triangle.C.y)
			endShape(CLOSE)
		}
	}
}

class TElement {
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
