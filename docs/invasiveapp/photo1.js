let ready = false;

function mousePressed() {
    if (!ready) { // ! --> not
        Tone.start();
        ready = true;
        console.log("readyload");
    }
}

let player = new Tone.Player("https://netart.skwampus.com/assets/gulps.mp3").toDestination();
player.loop = true;
player.autostart = true;

let wave;

Tone.Master.volume.value = -6;

function mousePressed() {
    if (!ready) { // ! --> not

        Tone.start();
        ready = true;
    }

}