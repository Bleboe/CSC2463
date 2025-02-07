let cyclops;
let character;

function preload() {
  cyclops = loadImage("Media/Cyclops.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character = new Character(random(80, width - 80), random(80, height - 80));
  character.addAnimation("down", new SpriteAnimation(cyclops, 6, 5, 6));
  character.addAnimation("up", new SpriteAnimation(cyclops, 0, 5, 6));
  character.addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));
  character.currentAnimation = "stand";
}

function draw() {
  background(220);

  character.draw();
}

function keyPressed() {
  character.keyPressed();
}

function keyReleased() {
  character.keyReleased();
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
    //console.log(animation);
    if(animation) {
      
      switch(this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down":
          this.y += 2;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
    }
  }
  
  keyReleased() {
    character.currentAnimation = "stand";
    //this.animations[this.currentAnimation].flipped = true;

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
    console.log("draw animation");
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
