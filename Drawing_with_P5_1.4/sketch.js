let GameStates = Object.freeze({ 
  START: "start",
  PLAY: "play",
  END: "end"
});

let gameState = GameStates.START;
let score = 0;
let time = 30;
let textPadding = 15;
let gameFont;
let bug;
let bugs = [];
let bugcount;

function preload() {
  bug = loadImage("Media/Bug.png");
  gameFont = loadFont("Media/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textFont(gameFont);

  for(bugcount = 0; bugcount < 50; bugcount++) {
    bugs[bugcount] = new Character(random(80, width - 80), random(80, height - 80));
    bugs[bugcount].addAnimation("left", new SpriteAnimation(bug, 0, 0, 2));
    bugs[bugcount].addAnimation("right", new SpriteAnimation(bug, 0, 0, 2));
    bugs[bugcount].addAnimation("squished", new SpriteAnimation(bug, 0, 1, 1));
    bugs[bugcount].addAnimation("delete", new SpriteAnimation(bug, 1, 1, 1));
    bugs[bugcount].currentAnimation = (bugcount % 2 == 0) ? "left" : "right";
  }
}

function draw() {
  background(220);

  switch(gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(18);
      text("Welcome to BUG SQUISH!", (width/2), (height/2) - 50);
      text("press ENTER to Start", width/2, height/2);
      break;
    case GameStates.PLAY:
      textAlign(CENTER, CENTER);
      text("Left click on a bug to squish it ", (width/2) - textPadding, textPadding);
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);

      for(let i = 0; i < bugs.length; i++) {
        bugs[i].draw();
      }

      time -= deltaTime / 1000;
      if(time <= 0) {
        gameState = GameStates.END;
      }
      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("Game Over!", width/2, (height/2) - 50);
      text("Score: " + score, width/2, (height/2));
      break;
  }
}

function keyPressed() {
  switch(gameState) {
    case GameStates.START:
      if(keyCode === ENTER) {
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;
  }
}

function mouseClicked() {
  switch(gameState) {
    case GameStates.START:
      break;
    case GameStates.PLAY:
      for(bugcount = 0; bugcount < bugs.length; bugcount++) {
        bugs[bugcount].mouseClicked();
      }
      break;
    case GameStates.END:
      break;
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
          this.animations[this.currentAnimation].flipped = true;
          this.x -= (score >= 30) ? 8 : (score >= 15) ? 5 : (score >= 5) ? 3 : 2;
          if(this.x < 0) {
            this.currentAnimation = "right";
          }
          break;
        case "right":
          this.animations[this.currentAnimation].flipped = false;
          this.x += (score >= 30) ? 8 : (score >= 15) ? 5 : (score >= 5) ? 3 : 2;
          if(this.x > width) {
            this.currentAnimation = "left";
          }
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  mouseClicked() {
    if(this.currentAnimation === "squished") {

    }
    else if((this.x < (mouseX + 20) && this.x > (mouseX - 20)) &&
        (this.y < (mouseY + 20) && this.y > (mouseY - 20))) {
          score += 1;
          switch(this.currentAnimation) {
            case "left":
              this.currentAnimation = "squished";
              this.animations[this.currentAnimation].flipped = true;
              break;
            case "right":
              this.currentAnimation = "squished";
              this.animations[this.currentAnimation].flipped = false;
              break;
          }
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
    this.flipped = true;
  }

  draw() {
    let s = (this.flipped) ? 1 : -1;
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
