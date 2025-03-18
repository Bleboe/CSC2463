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
let synth1;
let synth2;
let part1;
let seq1;
let gain1, panner1, noiseEnv1, centerFreq1, filt1, noise1;
let gain2, panner2, noiseEnv2, centerFreq2, filt2, noise2;

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


  Tone.Transport.timeSignature = [4, 4];
  Tone.Transport.bpm = 240;
  synth2 = new Tone.Synth().toDestination();
  synth2.volume.value = -24;
  seq1 = new Tone.Sequence(((time, note) => {
    synth2.triggerAttackRelease(note, "2n", time);
  }), ["D4", "D4", "D5", null, "A4", null, null, "G#4", 
        null, "G4", null, "f4", null, "D4", "F4", "G4",
        "C4", "C4", "D5", null, "A4", null, null, "G#4",
        null, "G4", null, "F4", null, "D4", "F4", "G4",
        "B3", "B3", "D5", null, "A4", null, null, "G#4",
        null, "G4", null, "F4", null, "D4", "F4", "G4",
        "A#3", "A#3", "D5", null, "A4", null, null, "G#4",
        null, "G4", null, "F4", null, "D4", "F4", "G4"
      ], "16n").start();

  gain1 = new Tone.Gain().toDestination();
  panner1 = new Tone.Panner(0).connect(gain1);
  noiseEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.7,
    decay: 0.5,
    sustain: 1,
    release: 0.1
  }).connect(panner1);
  centerFreq1 = map(height/2, 0, height, 10000, 100, true);
  filt1 = new Tone.Filter(centerFreq1, "highpass").connect(noiseEnv1);
  noise1 = new Tone.Noise("brown").start().connect(filt1);
  noise1.volume.value = 12;

  gain2 = new Tone.Gain().toDestination();
  panner2 = new Tone.Panner(0).connect(gain1);
  noiseEnv2 = new Tone.AmplitudeEnvelope({
    attack: 0.7,
    decay: 0.5,
    sustain: 1,
    release: 0.1
  }).connect(panner2);
  centerFreq2 = map(height/2, 0, height, 10000, 100, true);
  filt2 = new Tone.Filter(centerFreq2, "lowpass").connect(noiseEnv2);
  noise2 = new Tone.Noise("pink").start().connect(filt2);
  noise2.volume.value = 6;
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
      if(time <= 0 || score === 50) {
        gameState = GameStates.END;
        if (Tone.context.state === "running") {
          Tone.start().then(() => {
            console.log("context has stoped");
            Tone.Transport.stop();
          })
        } else {
          Tone.Transport.stop();
        }
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
        if (Tone.context.state != "running") {
          Tone.start().then(() => {
            console.log("context has started");
            Tone.Transport.start();
          })
        } else {
          Tone.Transport.start();
        }
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

          if(score >= 30) {
            this.x -= 8;
            synth2.volume.value = 0;
          } else if(score >= 15) {
            this.x -= 5;
            synth2.volume.value = -12;
          } else if(score >= 5) {
            this.x -= 3;
            synth2.volume.value = -18;
          } else {
            this.x -= 2;
          }

          if(this.x < 0) {
            this.currentAnimation = "right";
          }
          break;
        case "right":
          this.animations[this.currentAnimation].flipped = false;
          
          if(score >= 30) {
            this.x += 8;
            synth2.volume.value = 0;
          } else if(score >= 15) {
            this.x += 5;
            synth2.volume.value = -12;
          } else if(score >= 5) {
            this.x += 3;
            synth2.volume.value = -18;
          } else {
            this.x += 2;
          }
          
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
          noiseEnv1.triggerAttackRelease(0.1);
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
    else {
      noiseEnv2.triggerAttackRelease(0.1);
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
