let cyclops;
let robot;
let ninja;
let characters = [];

function preload() {
  cyclops = loadImage("Media/Cyclops.png");
  robot = loadImage("Media/Robot.png");
  ninja = loadImage("Media/Ninja.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  characters[0] = new Character(random(80, width - 80), random(80, height - 80));
  characters[0].addAnimation("left", new SpriteAnimation(cyclops, 1, 0, 6));
  characters[0].addAnimation("right", new SpriteAnimation(cyclops, 1, 0, 6));
  characters[0].addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));
  characters[0].currentAnimation = "stand";

  characters[1] = new Character(random(80, width - 80), random(80, height - 80));
  characters[1].addAnimation("left", new SpriteAnimation(robot, 1, 0, 6));
  characters[1].addAnimation("right", new SpriteAnimation(robot, 1, 0, 6));
  characters[1].addAnimation("stand", new SpriteAnimation(robot, 0, 0, 1));
  characters[1].currentAnimation = "stand";

  characters[2] = new Character(random(80, width - 80), random(80, height - 80));
  characters[2].addAnimation("left", new SpriteAnimation(ninja, 1, 0, 6));
  characters[2].addAnimation("right", new SpriteAnimation(ninja, 1, 0, 6));
  characters[2].addAnimation("stand", new SpriteAnimation(ninja, 0, 0, 1));
  characters[2].currentAnimation = "stand";
}

function draw() {
  background(220);

  for(let i = 0; i < 3; i++) {
    characters[i].draw();
  }
}

function keyPressed() {
  for(let i = 0; i < 3; i++) {
    characters[i].keyPressed();
  }
}

function keyReleased() {
  for(let i = 0; i < 3; i++) {
    characters[i].keyReleased();
  }
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if(animation) {
      
      switch(this.currentAnimation) {
        case "left":
          this.x -= 2;
          break;
        case "right":
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations[this.currentAnimation].flipped = true;
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        this.animations[this.currentAnimation].flipped = false;
        break;
    }
  }
  
  keyReleased() {
    switch(keyCode) {
      case LEFT_ARROW:
        for(let i = 0; i < 3; i++) {
          characters[i].currentAnimation = "stand";
          this.animations[this.currentAnimation].flipped = true;
        }
        break;
      case RIGHT_ARROW:
        for(let i = 0; i < 3; i++) {
          characters[i].currentAnimation = "stand";
          this.animations[this.currentAnimation].flipped = false;
        }
        break;
    }
    
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.U = startU;
    this.V = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.U * 80, this.V * 80, 80, 80);

    this.frameCount++;
    if(this.frameCount % 10 === 0) {
      this.U++;
    }
    if(this.U === this.startU + this.duration) {
      this.U = this.startU;
    }
  }
}
