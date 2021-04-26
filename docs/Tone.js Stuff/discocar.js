let ready = false;

function setup() {
    createCanvas(1, 1)
}

function mousePressed() {
    if (!ready) { // ! --> not
        Tone.start();
        ready = true;
        console.log("readyload");
    }
}

let player = new Tone.Player("https://scottnelson935.github.io/MUS7746SkwampusNetArtRepo/assets/SpanishFleaMidi.mp3").toDestination();
player.autostart = true;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}function draw() {
    background(landscape);

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
    landscape = loadImage("https://scottnelson935.github.io/MUS7746SkwampusNetArtRepo/assets/everest.jpg");
}

function mousePressed() {
    if (!ready) { // ! --> not

        Tone.start();
        ready = true;
    }

}