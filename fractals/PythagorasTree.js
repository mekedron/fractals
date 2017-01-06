/**
 * Треугольник серпинского
 *
 * @class
 * @implements {BaseFractal}
 */
class PythagorasTree extends BaseFractal {
  constructor(x, y, scl) {
    super(x, y, scl)

    this.limit = 14
  }

  doFirstStep() {
    this.step = 1

    let realScl = floor(this.scl / 10)
    let e = createVector(0, this.y)
    let f = createVector(0, this.y - realScl)
    
    this.els = [new PythagorasSquare(e, f)]
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
      let el = this.els[i]
      next.push(el)
      if (el.withChilds) continue
      el.step = i
      el.withChilds = true
      
      let c = el.B.copy()
      let v = p5.Vector.sub(el.B, el.C)
      v.rotate(radians(90))
      v.add(el.C)

      let c2 = el.B.copy()
      let v2 = p5.Vector.sub(el.C, el.B)
      v2.rotate(radians(-90))
      v2.add(el.B)
      
      let v3 = collideLineLine(el.B.x, el.B.y, v.x, v.y, el.C.x, el.C.y, v2.x, v2.y, true)
      v3 = createVector(v3.x, v3.y)


      let e1 = p5.Vector.sub(v3, el.B).div(2).add(el.B)
      point(e1.x, e1.y)

      let e2 = p5.Vector.sub(v3, el.C).div(2).add(el.C)
      point(e2.x, e2.y)

      let f1 = el.F.copy().sub(e1).mult(-2).add(e1)
      point(f1.x, f1.y)

      let f2 = el.F.copy().sub(e2).mult(-3).add(el.F)
      point(f2.x, f2.y)

      next.push(new PythagorasSquare(e1, f1))
      next.push(new PythagorasSquare(e2, f2))
    }
    this.els = next
    return true
  }

  draw() {
    stroke(1)
    noFill()
    let xOffset = this.x / 1.5
    for (let i = 0; i < this.els.length; i++) {
      let el = this.els[i]
      beginShape()
      vertex(xOffset + el.A.x, el.A.y)
      vertex(xOffset + el.B.x, el.B.y)
      vertex(xOffset + el.C.x, el.C.y)
      vertex(xOffset + el.D.x, el.D.y)
      vertex(xOffset + el.A.x, el.A.y)
      //vertex(el.E.x, el.E.y)
      //vertex(el.F.x, el.F.y)
      endShape(CLOSE)
    }
  }
}

class PythagorasSquare {
  /**
   * @constructor
   * @param  {p5.Vector}  start  - Точка начала
   * @param  {p5.Vector}  end    - Точка конца
   * @param  {p5.Vector}  withChilds    - имеет ли детей
   */
  constructor(start, end, withChilds) {
    this.start = start
    this.end = end
    this.step = 1
    this.withChilds = withChilds || false
  }
  get E() {
    return this.start
  }
  get F() {
    return this.end
  }
  get A() {
    return this.E.copy().sub(this.F).div(2).rotate(radians(90)).add(this.E)
  }
  get B() {
    return this.E.copy().sub(this.F).div(2).rotate(radians(90)).add(this.F)
  }
  get C() {
    return this.E.copy().sub(this.F).div(2).rotate(-radians(90)).add(this.F)
  }
  get reversedC() {
    return this.E.copy().sub(this.F).div(2).rotate(-radians(90)).add(this.F)
  }
  get D() {
    return this.E.copy().sub(this.F).div(2).rotate(-radians(90)).add(this.E)
  }
}
