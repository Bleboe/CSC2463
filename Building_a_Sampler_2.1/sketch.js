let sampler;
let button1;
let button2;
let button3;
let button4;
let samples;
let delayTimeSlider;
let feedbackSlider;
let distortionSlider;
let wetSlider;

let rev = new Tone.Reverb(5).toDestination();
let tremolo = new Tone.Tremolo(9, 0.75).connect(rev);
let dist = new Tone.Distortion(0).connect(tremolo);
let del = new Tone.FeedbackDelay(0, 0).connect(tremolo); // delay, feedback
del.wet.value = 0.5;


function preload() {
  // sampler = new Tone.Player("Media/cat_meow.mp3").toDestination();
  samples = new Tone.Players({
    cat: "Media/cat_meow.mp3",
    dog: "Media/dog_bark.mp3",
    amongus: "Media/amongus.mp3",
    fart: "Media/fart.mp3"
  }).connect(del)
}

function setup() {
  createCanvas(400, 400);

  button1 = createButton("Play Cat sample");
  button1.position(10, 10);
  button1.mousePressed(() => {samples.player("cat").start()});

  button2 = createButton("Play Dog sample");
  button2.position(200, 10);
  button2.mousePressed(() => {samples.player("dog").start()});

  button3 = createButton("Play AmongUs sample");
  button3.position(10, 40);
  button3.mousePressed(() => {samples.player("amongus").start()});

  button2 = createButton("Play Fart sample");
  button2.position(200, 40);
  button2.mousePressed(() => {samples.player("fart").start()});

  wetSlider = createSlider(0, 1, 0, 0.01);
  wetSlider.position(200, 150);
  wetSlider.input(() => {rev.wet.value = wetSlider.value()});

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

function startAudioContext() {
  if( Tone.context.state != "running") {
    Tone.start();
    console.log("Audio Context started");
  }
  else {
    console.log("Audio Context is already running");
  }
}
