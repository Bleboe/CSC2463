let x = 200, y = 200;
let dragging = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if(dragging) {
    fill("green");
  } else {
    fill("red");
  }
  square(x, y, 100);
}

function mousePressed() {
  console.log("mouse pressed");
  if(dragging || (mouseX >= x && mouseX <= x + 100
    && mouseY >= y && mouseY <= y + 100)) {
    dragging = true;
  }
}

function mouseDragged() {
  console.log(`mouse position: (${mouseX}, ${mouseY})`);
  if (dragging) {
    x += mouseX - pmouseX;
    y += mouseY - pmouseY;
  }
}

function mouseReleased() {
  dragging = false;
}
