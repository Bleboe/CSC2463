let polySynth;
let filt;
let delayTimeSlider;
let feedbackSlider;

let keyNotes1 = {
  'w': 'C3',
  'e': 'D3',
  'r': 'E3',
  't': 'F3',
  'y': 'G3',
  'u': 'A3',
  'i': 'B3',
  'o': 'C4'
}

function setup() {
  createCanvas(400, 400);
  filt = new Tone.Filter(1000, "lowpass").toDestination();
  let rev = new Tone.Reverb(3).connect(filt);
  let dist = new Tone.Distortion(0.1).connect(rev);
  let del = new Tone.FeedbackDelay(0, 0).connect(dist); // delay, feedback
  del.wet.value = 0.5;

  polySynth = new Tone.PolySynth(Tone.Synth).connect(del);
  polySynth.set({
    envelope: {
      attack: 0.5,
      decay: 0.8,
      sustain: 0.8,
      release: 0.7
    },
    oscillator: {
      type: "sawtooth"
    }
  });
  polySynth.volume.value = -6;

  delayTimeSlider = createSlider(0, 1, 0, 0.01);
  delayTimeSlider.position(10, 100);
  delayTimeSlider.input(() => {del.delayTime.value = delayTimeSlider.value()});

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
}

function draw() {
  background(220);
  text("keyboard mappings: " + 
        "\n\tw => C3\n\te =>D3\n\tr => E3\n\tt =>F3\n\ty => G3\n\tu =>A3\n\ti => B3\n\to =>C4", 100, 200);
  text("Delay Time: " + delayTimeSlider.value(), 15, 90);
  text("Feedback: " + feedbackSlider.value(), 205, 90);
}

function keyPressed() {
  let pitch1 = keyNotes1[key];
  if(pitch1) {
    polySynth.triggerAttack(pitch1);
  }
}

function keyReleased() {
  let pitch1 = keyNotes1[key];
  if(pitch1) {
    polySynth.triggerRelease(pitch1);
  }
}
