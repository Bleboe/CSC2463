function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(100, 50, 100);

  noStroke();
  fill(255);
  square(100, 100, 100);
  fill(0);
  circle(130, 130, 20);
  circle(170, 130, 20);
  arc(150, 155, 70, 30, 0, 180);

  stroke('blue');
  strokeWeight(3);
  beginShape();
  vertex(100, 100);
  vertex(75, 75);
  vertex(125, 90);
  vertex(130, 70);
  vertex(150, 90);
  vertex(170, 50);
  vertex(185, 90);
  vertex(200, 100);
  endShape(CLOSE);
}
