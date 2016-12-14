let kochSnowflake;
let needRedraw = false;

function setup() {
	createCanvas(1000, 700);
	frameRate(10);
	kochSnowflake = new KochSnowflake(500, 300, 500);
	kochSnowflake.draw();
	needRedraw = true;
}

function mouseClicked() {
	kochSnowflake.makeAStep();
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		kochSnowflake.makeAStep();
		return false;
	} else if (keyCode == DOWN_ARROW) {
		kochSnowflake.makeAStep(true);
		return false;
	}
}

function draw() {
	if ((kochSnowflake.drawedStep !== kochSnowflake.step) || (needRedraw)) {
		background(255);
		kochSnowflake.draw();
		needRedraw = false;
	}
}
