let ready = false;

// let osc;
// let osc2;
// let osc3;
// let osc4;
// let osc5;
// let lfo;
// let lfo2;
// let lfo3;
// let lfo4;
// let lfo5;
// let noise;
// let autoFilter;

// let noise2;
// let autoFilter2;

// let noise3;
// let autoFilter3;

// let noise4;
// let autoFilter4;

// let noise5;
// let autoFilter5;

function mousePressed() {
    if (!ready) { // ! --> not
        Tone.start();
        ready = true;
        console.log("readyload");
    }
}

let player = new Tone.Player("https://netart.skwampus.com/assets/nightflymidi.mp3").toDestination();
player.autostart = true;

let wave;

// Create a new canvas to match the broswer size
function setup() {
    createCanvas(windowWidth, windowHeight);

    // noise = new Tone.Noise("pink").start();
    // // noise.toDestination().start();
    // // noise.volume.value = -16;

    // autoFilter = new Tone.AutoFilter({
    //     frequency: "0.01n",
    //     baseFrequency: 200,
    //     octaves: 3
    // }).toDestination().start();

    // noise.connect(autoFilter);

    // noise2 = new Tone.Noise("white").start();
    // // noise.toDestination().start();
    // // noise.volume.value = -16;

    // autoFilter2 = new Tone.AutoFilter({
    //     frequency: "0.02n",
    //     baseFrequency: 100,
    //     octaves: 3
    // }).toDestination().start();

    // noise2.connect(autoFilter2);

    // noise3 = new Tone.Noise("brown").start();
    // // noise.toDestination().start();
    // // noise.volume.value = -16;

    // autoFilter3 = new Tone.AutoFilter({
    //     frequency: "0.03n",
    //     baseFrequency: 125,
    //     octaves: 2
    // }).toDestination().start();

    // noise3.connect(autoFilter3);

    // noise4 = new Tone.Noise("white").start();
    // // noise.toDestination().start();
    // // noise.volume.value = -16;

    // autoFilter4 = new Tone.AutoFilter({
    //     frequency: "0.04n",
    //     baseFrequency: 175,
    //     octaves: 3.5
    // }).toDestination().start();
    // noise4.connect(autoFilter4);
    // autoFilter4.type = "triangle29";

    // noise5 = new Tone.Noise("white").start();
    // // noise.toDestination().start();
    // // noise.volume.value = -16;

    // autoFilter5 = new Tone.AutoFilter({
    //     frequency: "0.06n",
    //     baseFrequency: 75,
    //     octaves: 3
    // }).toDestination().start();
    // noise5.connect(autoFilter5);
    // autoFilter4.type = "triangle14";

    // autoFilter.start();

    // osc = new Tone.Oscillator().start; //default 440 --> A4
    // osc.frequency.value = 77.782;
    // osc.type = 'sine';
    // osc.toDestination();
    // osc.volume.value = -32;

    // osc2 = new Tone.Oscillator(); //default 440 --> A4
    // osc2.frequency.value = 155.563;
    // osc2.type = 'sine';
    // osc2.toDestination();
    // osc2.volume.value = -6;

    // osc3 = new Tone.Oscillator(); //default 440 --> A4
    // osc3.frequency.value = 233.345;
    // osc3.type = 'sine';
    // osc3.toDestination();
    // osc3.volume.value = -6;

    // osc4 = new Tone.Oscillator(); //default 440 --> A4
    // osc4.frequency.value = 544.472;
    // osc4.type = 'sine';
    // osc4.toDestination();
    // osc4.volume.value = -6;

    // osc5 = new Tone.Oscillator(); //default 440 --> A4
    // osc5.frequency.value = 855.599;
    // osc5.type = 'sine';
    // osc5.toDestination();
    // osc5.volume.value = -6;


    // lfo = new Tone.LFO("0.1hz", 65, 85);
    // lfo.connect(osc.frequency);

    // lfo2 = new Tone.LFO("0.1hz", 145, 160);
    // lfo2.connect(osc2.frequency);

    // lfo3 = new Tone.LFO("0.1hz", 225, 240);
    // lfo3.connect(osc3.frequency);

    // lfo4 = new Tone.LFO("0.1hz", 535, 560);
    // lfo4.connect(osc4.frequency);

    // lfo5 = new Tone.LFO("0.1hz", 845, 865);
    // lfo5.connect(osc5.frequency);

    wave = new Tone.Waveform();
    Tone.Master.connect(wave);

    Tone.Master.volume.value = -6;
}

// function song(time) {

//     if (counter % 4 === 0) {
//         kickSynth.triggerAttackRelease('C#2', '8n', time, 1)
//     }

//     if (counter % 4 === 2) {
//         kickSynth.triggerAttackRelease('C#2', '8n', time, 0.6)
//     }

//     if (counter % 4 !== 0) {
//         bassSynth.triggerAttackRelease('C#2', '8n', time, 1)
//     }

//     if (counter % 4 === 2) {
//         keySynth.triggerAttackRelease(['C#3', 'G#3', 'B3', 'E4'], '8n', time, 1)
//     }

//     if (counter % 4 !== 1) {
//         cymbalSynth.triggerAttackRelease('F#4', '16n', time, 0.3);
//     }
//     counter = (counter + 1) % 16
// }

//On window resize, update the canvas size
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

//Main render Loop
function draw() {
    // background(landscape);
    imageMode(CENTER);
    image(landscape, width / 2, height / 2)

    if (ready) {
        //do the audio stuff
        // osc.frequency.value = map(mouseX, 0, width, 110, 880);


        stroke(255);
        let buffer = wave.getValue(0);

        // look for a trigger point where the samples
        // are going from negative to positive
        let start = 0;
        for (let i = 1; i < buffer.length; i++) {
            if (buffer[i - 1] < 0 && buffer[i] >= 0) {
                start = i;
                break; // interrupts a for loop
            }
        }

        // calculate a new end point such that we
        //always draw the same number of samples in each frame
        let end = start + buffer.length / 2;
        // drawing the waveform
        for (let i = start; i < end; i++) {
            let x1 = map(i - 1, start, end, 0, width);
            let y1 = map(buffer[i - 1], -1, 1, 0, height);
            let x2 = map(i, start, end, 0, width);
            let y2 = map(buffer[i], -1, 1, 0, height);
            line(x1, y1, x2, y2);
        }

    }
    else {
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        text("CLICK TO START", width / 2, height / 2);
    }
}

function preload() {
    landscape = loadImage("https://netart.skwampus.com/assets/wagon.jpeg");
}

function mousePressed() {
    if (!ready) { // ! --> not

        Tone.start();
        ready = true;
    }

}