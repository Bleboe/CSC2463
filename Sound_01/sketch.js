let sampler;
let button1;
let button2;
let startContextButton;
let samples;

function preload() {
  // sampler = new Tone.Player("Media/cat_meow.mp3").toDestination();
  samples = new Tone.Players({
    cat: "Media/cat_meow.mp3",
    seagulls: "Media/seagulls.mp3"
  }).toDestination()
}

function setup() {
  createCanvas(400, 400);
  startContextButton = createButton("Start Audio Context");
  startContextButton.position(0,0);
  startContextButton.mousePressed(startAudioContext());
  button1 = createButton("Play Cat sample");
  button1.position(10, 30);
  button2 = createButton("Play Seagulls sample");
  button2.position(200, 30);
  button1.mousePressed(() => {samples.player("cat").start()});
  button2.mousePressed(() => {samples.player("seagulls").start()});
}

function draw() {
  background(220);
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
