function setup() {
  createCanvas(400, 1200);
  background(255); // greenscreen green
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  // example 1
  fill(100, 255, 100);
  strokeWeight(0);
  rect(0, 0, 400, 200);
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(215, 15, 170, 170);
  circle(100, 100, 170);

  // example 2
  fill(0, 40, 100, 0.5);
  strokeWeight(0);
  circle(200, 300, 150);
  fill(100, 50, 100, 0.5);
  circle(250, 380, 150);
  fill(230, 50, 100, 0.5);
  circle(150, 380, 150);

  // example 3
  fill(0);
  strokeWeight(0);
  rect(0, 500, 400, 200);
  fill(60, 100, 100);
  arc(100, 600, 150, 150, 230, 140);
  fill(0, 90, 100);
  rect(225, 600, 150, 70);
  arc(300, 600, 150, 150, 180, 0);
  fill(0, 0, 100);
  circle(265, 600, 40);
  circle(335, 600, 40);
  fill(255, 100, 100);
  circle(265, 600, 25);
  circle(335, 600, 25);

  // example 4
  fill(255, 100, 55);
  rect(0, 700, 400, 300);
  fill(150, 100, 65);
  stroke(255);
  strokeWeight(3);
  circle(200, 850, 200);
  fill(0, 100, 100);
  beginShape();
  vertex(200, 750);
  vertex(225, 815);
  vertex(290, 815);
  vertex(240, 860);
  vertex(260, 930);
  vertex(200, 890);
  vertex(140, 930);
  vertex(160, 860);
  vertex(110, 815);
  vertex(170, 815);
  endShape(CLOSE);
}