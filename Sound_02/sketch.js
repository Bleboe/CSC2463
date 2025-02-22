let sampler;
let button1;
let button2;
let startContextButton;
let samples;
let delayTimeSlider;
let feedbackSlider;
let distortionSlider;
let wetSlider;
let drySlider;

let rev = new Tone.Reverb(5).toDestination();
let dist = new Tone.Distortion(0).connect(rev);
let del = new Tone.FeedbackDelay(0, 0).connect(dist); // delay, feedback
del.wet.value() = 0.5;


function preload() {
  // sampler = new Tone.Player("Media/cat_meow.mp3").toDestination();
  samples = new Tone.Players({
    cat: "Media/cat_meow.mp3",
    seagulls: "Media/seagulls.mp3"
  }).connect(del)
}

function setup() {
  createCanvas(400, 400);
  startContextButton = createButton("Start Audio Context");
  startContextButton.position(100, 0);
  startContextButton.mousePressed(startAudioContext());

  button1 = createButton("Play Cat sample");
  button1.position(10, 30);
  button1.mousePressed(() => {samples.player("cat").start()});

  button2 = createButton("Play Seagulls sample");
  button2.position(200, 30);
  button2.mousePressed(() => {samples.player("seagulls").start()});

  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 150);
  wetSlider.input(() => {rev.wet.value() = wetSlider.value()});

  distortionSlider = createSlider(0, 10, 0, 0.01);
  distortionSlider.position(10, 150);
  distortionSlider.input(() => {dist.distortion = distortionSlider.value()});

  delayTimeSlider = createSlider(0, 1, 0, 0.01);
  delayTimeSlider.position(10, 100);
  delayTimeSlider.input(() => {del.delayTime.value = delayTimeSlider.value()});

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(200, 100);
  feedbackSlider.input(() => {del.feedback.value = feedbackSlider.value()});
}

function draw() {
  background(220);
  text("Delay Time: " + delayTimeSlider.value(), 15, 90);
  text("Feedback: " + feedbackSlider.value(), 205, 90);
  text("Distortion: " + distortionSlider.value(), 15, 140);
  text("Reverb: " + wetSlider.value(), 205, 140);
}

// function playSample() {
//   sampler.start();
// }

function startAudioContext() {
  if( Tone.context.state != "running") {
    Tone.start();
    console.log("Audio Context started");
  }
  else {
    console.log("Audio Context is already running");
  }
}
