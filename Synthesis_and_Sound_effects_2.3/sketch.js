let filt;
let lfoFilt;
let values;
let noise;
let noiseEnv;
let car;

function preload() {
  car = loadImage('Media/car_passing.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  filt = new Tone.AutoFilter({
    frequency: 0.8,
    depth: 0.5,
    baseFrequency: 1000,
    octaves: 2
  }).toDestination().start();
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.8,
    decay: 4,
    sustain: 1,
    release: 0.1
  }).connect(filt);
  lfoFilt = new Tone.LFO({
    frequency: 2,
    min: 800,
    max: 4500
  }).connect(filt.frequency);
  noise = new Tone.Noise("pink").connect(noiseEnv).start();
  values = new Float32Array([-96, -96, -30, -30, -12, 0, -12, -30, -30]);
}

function draw() {

}

function mouseClicked() {
  image(car, 0, 0);
  noiseEnv.triggerAttackRelease(6);
  noise.volume.setValueCurveAtTime(values, Tone.now(), 6);
  car.reset();
}