let ready = false;

let loopBeat;
let kickSynth, cymbalSynth, bassSynth, keySynth;
let counter;

let wave;

// Create a new canvas to match the broswer size
function setup() {
    createCanvas(windowWidth, windowHeight);

    counter = 0;

    kickSynth = new Tone.MembraneSynth().toMaster();

    bassSynth = new Tone.FMSynth({
        envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.2,
            release: 0.01
        },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 8000,
        octaves: 0.5
    }).toMaster();

    keySynth = new Tone.PolySynth().toMaster();

    cymbalSynth = new Tone.MetalSynth({
        frequency: 250,
        envelope: {
            attack: 0.001,
            decay: 0.1,
            release: 0.01
        },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 8000,
        octaves: 0.5
    }).toMaster();

    cymbalSynth.volume.value = -24;
    keySynth.volume.value = -9;

    loopBeat = new Tone.Loop(song, '4n');
    Tone.Transport.bpm.value = 350;
    Tone.Transport.start();
    loopBeat.start(0);

    wave = new Tone.Waveform();
    Tone.Master.connect(wave);

    Tone.Master.volume.value = -6;
}

function song(time) {

    if (counter % 4 === 0) {
        kickSynth.triggerAttackRelease('C#2', '8n', time, 1)
    }

    if (counter % 4 === 2) {
        kickSynth.triggerAttackRelease('C#2', '8n', time, 0.6)
    }

    if (counter % 4 !== 0) {
        bassSynth.triggerAttackRelease('C#2', '8n', time, 1)
    }

    if (counter % 4 === 2) {
        keySynth.triggerAttackRelease(['C#3', 'G#3', 'B3', 'E4'], '8n', time, 1)
    }

    if (counter % 4 !== 1) {
        cymbalSynth.triggerAttackRelease('F#4', '16n', time, 0.3);
    }
    counter = (counter + 1) % 16
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

function mousePressed() {
    if (!ready) { // ! --> not

        Tone.start();
        ready = true;
    }

}