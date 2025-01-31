let strokeColor = [0, 0, 0];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
}

function draw() {
  strokeWeight(3);
  stroke(255);
  fill(255, 0, 0); // red
  square(0, 0, 50);
  fill(255, 125, 0); // orange
  square(0, 50, 50);
  fill(255, 255, 0); // yellow
  square(0, 100, 50);
  fill(0, 255, 0); // green
  square(0, 150, 50);
  fill(0, 200, 255); // light blue
  square(0, 200, 50);
  fill(0, 0, 255); // blue
  square(0, 250, 50);
  fill(220, 0, 255); // purple
  square(0, 300, 50);
  fill(130, 55, 0); // brown
  square(0, 350, 50);
  fill(255, 255, 255); // white
  square(0, 400, 50);
  fill(0, 0, 0); // black
  square(0, 450, 50);
}

function mousePressed() {
  console.log("mouse pressed");
  if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 0 && mouseY <= 0 + 50)) {
    strokeColor =[255, 0, 0];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 50 && mouseY <= 50 + 50)) {
    strokeColor = [255, 125, 0];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 100 && mouseY <= 100 + 50)) {
    strokeColor = [255, 255, 0];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 150 && mouseY <= 150 + 50)) {
    strokeColor = [0, 255, 0];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 200 && mouseY <= 200 + 50)) {
    strokeColor = [0, 200, 255];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 250 && mouseY <= 250 + 50)) {
    strokeColor = [0, 0, 255];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 300 && mouseY <= 300 + 50)) {
    strokeColor = [220, 0, 255];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 350 && mouseY <= 350 + 50)) {
    strokeColor = [130, 55, 0];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 400 && mouseY <= 400 + 50)) {
    strokeColor = [255, 255, 255];
  } else if((mouseX >= 0 && mouseX <= 0 + 50
    && mouseY >= 450 && mouseY <= 450 + 50)) {
    strokeColor = [0, 0, 0];
  } 
}

function mouseDragged() {
  strokeWeight(10);
  stroke(strokeColor);
  line(pmouseX, pmouseY, mouseX, mouseY);
}