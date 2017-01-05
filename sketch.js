let fractal

function setup() {
	createCanvas(1000, 700)
	noLoop()
	fractal = new LevyCCurve(500, 400, 800)
}

function mouseClicked() {
	if (fractal.makeAStep())
		redraw()
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		if (fractal.makeAStep())
			redraw()
	} else if (keyCode == DOWN_ARROW) {
		if (fractal.makeAStep(true))
			redraw()
	}
}

function draw() {
	background(255)
	fractal.draw()
}
