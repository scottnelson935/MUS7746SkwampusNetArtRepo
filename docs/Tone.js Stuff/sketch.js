let ready = false;

let osc;
let osc2;
let lfo; 

let wave;

// Create a new canvas to match the broswer size
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  osc = new Tone.Oscillator(); //default 440 --> A4
  osc.type = 'square';
  osc.toDestination();
  osc.volume.value = -6;

  osc2 = new Tone.Oscillator(); //default 440 --> A4
  osc2.frequency.value = 220;
  //osc2.toDestination();
  osc2.volume.value = -6;

  lfo = new Tone.LFO("0.1hz", 210, 230);
  lfo.connect(osc.frequency);

  wave = new Tone.Waveform();
  Tone.Master.connect(wave);

  Tone.Master.volume.value = -6;
}

//On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//Main render Loop
function draw() {
  background(0);
  
  if (ready) {
    //do the audio stuff
    //osc.frequency.value = map(mouseX, 0, width, 110, 880);
    osc2.volume.value = map(mouseX, 0, width, -64, -3)
    lfo.min.value = map(mouseY, 0, height, 100, 210);
    lfo.max.value = map(mouseX, 0, height, 240, 800);


    stroke(255);
    let buffer = wave.getValue(0);

    // look for a trigger point where the samples
    // are going from negative to positive
    let start = 0;
    for (let i=1; i < buffer.length; i++) {
        if (buffer[i-1] < 0 && buffer[i] >= 0) {
            start = i;
            break; // interrupts a for loop
        }
    }

    // calculate a new end point such that we
    //always draw the same number of samples in each frame
    let end = start + buffer.length/2;
    // drawing the waveform
    for (let i=start; i < end; i++) {
        let x1 = map(i-1, start, end, 0, width);
        let y1 = map(buffer[i-1], -1, 1, 0, height);
        let x2 = map(i, start, end, 0, width);
        let y2 = map(buffer[i], -1, 1, 0, height);
        line(x1, y1, x2, y2);
    }

  }
  else {
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("CLICK TO START", width/2, height/2);
  }
}

function mousePressed() {
  if (!ready) { // ! --> not
    
    osc.start();
    osc2.start();
    lfo.start();
    ready = true;
  }
  
}