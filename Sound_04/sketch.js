let synth1;
let polySynth;
let noise1;
let noise2;
let ampEnv1;
let ampEnv2;
let filt1;
let filt;
let rev;
let activeKey = null;

let keyNotes = {
  'a': 'A4',
  's': 'B4',
  'd': 'C5',
  'f': 'D5'
}

let keyNotes1 = {
  'q': 'D4',
  'w': 'F4',
  'e': 'A4'
}

function setup() {
  createCanvas(400, 400);
  filt = new Tone.Filter(1000, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);
  synth1 = new Tone.Synth({ 
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.9,
      release: 0.3
    }
  }).connect(rev);
  synth1.portamento.value = 0.5;

  polySynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  polySynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.5,
      sustain: 0.8,
      release: 0.5
    },
    oscillator: {
      type: "sawtooth"
    }
  });
  polySynth.volume.value = -6;

  ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.5,
    sustain: 0,
    release: 0.1
  }).toDestination();
  filt1 = new Tone.Filter(1000, 'highpass').connect(ampEnv1);
  noise1 = new Tone.Noise('brown').connect(filt1).start();
}

function draw() {
  background(220);
}

function keyPressed() {
  let pitch = keyNotes[key];
  let pitch1 = keyNotes1[key];
  if(pitch && key !== activeKey) {
    synth1.triggerRelease();
    activeKey = key;
    synth1.triggerAttack(pitch);
  }
  else if(pitch1) {
    polySynth.triggerAttack(pitch1);
  }
  else if(key === 'z') {
    ampEnv1.triggerAttackRelease(1);
  }
}

function keyReleased() {
  let pitch1 = keyNotes1[key];
  if(key === activeKey) {
    synth1.triggerRelease();
    activeKey = null;
  }
  else if(pitch1) {
    polySynth.triggerRelease(pitch1);
  }
}
