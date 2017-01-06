/**
 * Драко малфой
 *
 * @class
 * @implements {BaseFractal}
 */
class Dragon extends BaseFractal {
  constructor(x, y, scl) {
    super(x, y, scl)

    this.limit = 14
  }

  doFirstStep() {
    this.step = 1

    let realScl = floor(this.scl / 10)
    let e = createVector(-realScl, this.y)
    let f = createVector(realScl, this.y)
    this.els.push(new DragonElement(e, f))

    // e = createVector(this.x - realScl, this.y + realScl)
    // f = createVector(this.x + realScl, this.y + realScl)
    // this.els.push(new DragonElement(e, f))

    // e = createVector(this.x - realScl, this.y - realScl)
    // f = createVector(this.x - realScl, this.y + realScl)
    // this.els.push(new DragonElement(e, f))

    // e = createVector(this.x + realScl, this.y + realScl)
    // f = createVector(this.x + realScl, this.y - realScl)
    // this.els.push(new DragonElement(e, f))
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

    let el = this.els[0]
    next.push(new DragonElement(el.A, el.B(false)))
    next.push(new DragonElement(el.B(false), el.C))
    for (let i = 1; i < this.els.length; i++) {
      el = this.els[i]
      if (el.withChilds) continue
      el.step = i
      el.withChilds = true

      if ((i % 2) === 1) { 
        next.push(new DragonElement(el.A, el.B(true)))
        next.push(new DragonElement(el.B(true), el.C))
      } else {
        next.push(new DragonElement(el.A, el.B(false)))
        next.push(new DragonElement(el.B(false), el.C))
      }
    }
    this.els = next
    return true
  }

  draw() {
    console.log('drawing LevyCCurve')
    stroke(0)
    noFill()
    let xOffset = this.x / 1.5
    for (let i = 0; i < this.els.length; i++) {
      let el = this.els[i]
      beginShape()
      vertex(xOffset + el.A.x, el.A.y)
      vertex(xOffset + el.C.x, el.C.y)
      //vertex(el.E.x, el.E.y)
      //vertex(el.F.x, el.F.y)
      endShape(CLOSE)
    }
  }
}

class DragonElement {
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
  get A() {
    return this.start
  }
  B(right) {
    let c = this.start.copy()
    let v = p5.Vector.sub(this.end, this.start)
    if (!right) {
      v.div(sin(radians(336))  * (- 1) + 1)
      v.rotate(-radians(45))
    } else {
      v.div(sin(radians(336))  * (- 1) + 1)
      v.rotate(+radians(45))
    }
    return c.add(v)
  }
  get C() {
    return this.end
  }
}
