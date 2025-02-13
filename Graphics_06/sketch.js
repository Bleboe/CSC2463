let video;
let playing = false;
let height = 400;
let ratio;
let mask;
let mike;
let r = 0;

function preload() {
  video = createVideo("Media/Fire.mp4");
  video.hide();

  ratio = video.width / video.height;

  mike = loadImage("Media/Mike.png");
}

function setup() {
  createCanvas(height * ratio, height);

  mask = createGraphics(width, height);
  mask.imageMode(CENTER);
  mask.angleMode(DEGREES);
  drawMike();
}

function draw() {
  background(220);

  mask.clear();
  drawMike();

  //tint("purple");
  video.mask(mask);
  image(video, 0, 0, width, height);

  r -= 2;
}

function mouseClicked() {
  if(!playing) {
    video.loop();
    playing = true;
  }
}

function mouseDragged() {
  mask.strokeWeight(20);
  mask.stroke(0, 100);
  mask.line(mouseX, mouseY, pmouseX, pmouseY);
}

function keyTyped() {
  if(key == "c") {
    mask.clear();
    drawMike();
  }
}

function drawMike() {
  mask.push();
  mask.translate(width/2, height/2);
  mask.scale(0.35);
  mask.rotate(r);
  mask.image(mike, 0, 0);
  mask.pop();
}
