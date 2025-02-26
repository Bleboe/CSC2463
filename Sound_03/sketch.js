let basicSynth;
let metalSynth;
let synthButton;
let fmSynth;
let lowpassfilter;

function setup() {
  createCanvas(400, 400);

  lowpassfilter = new Tone.Filter(800, "lowpass", -96).toDestination();

  basicSynth = new Tone.Synth({
    envelope: {
      attack: 0.1,
      decay: 1,
      sustain: 0.5,
      release: 0.3
    },
    oscillator: {
      tpye: 'sawtooth'
    }
  }).toDestination();
  console.log(basicSynth);
  synthButton = createButton("Play Synth");
  synthButton.position(height/6, width/6);
  synthButton.mousePressed(() => {basicSynth.triggerAttackRelease("C4", 2)});

  metalSynth = new Tone.MetalSynth({
    envelope: {
      attack: 0.5,
      decay: 5,
      sustain: 1,
      release: 3
    }
  }).toDestination();

  fmSynth = new Tone.FMSynth({
    harmonicity: 3.76,
    modulationIndex: 3
  }).connect(lowpassfilter);
}

function draw() {
  background(220);
}

function keyPressed() {
  if(key === "a") {
    basicSynth.triggerAttack("e5");
  }
  else if(key === "s") {
    metalSynth.triggerAttackRelease("C5", 4);
  }
  else if(key === "d") {
    fmSynth.triggerAttack("a4");
  }
}

function keyReleased() {
  if(key === "a") {
    basicSynth.triggerRelease();
  }
  else if(key === "d") {
    fmSynth.triggerRelease();
  }
}
