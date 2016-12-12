let kochSnowflake = new KochSnowflake(320, 190, 350);

function setup() {
    createCanvas(640, 480);
}

function mouseClicked() {
    kochSnowflake.nextStep();
}

function draw() {
    background(200);
    kochSnowflake.draw();
}
