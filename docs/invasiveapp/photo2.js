Tone.Master.volume.value = -6;
let ready = false;

function mousePressed() {
    if (!ready) { // ! --> not
        Tone.start();
        ready = true;
        console.log("readyload");
    }
}

window.addEventListener('blur', function () {
    // document.title = 'not focused';
    console.log('not focused');
    Tone.Transport.pause();
}, true);

window.addEventListener('focus', function () {
    // document.title = 'focused';
    console.log('focused');
    Tone.Transport.start();
}, true);

let player = new Tone.Player("https://netart.skwampus.com/assets/sulk.mp3").toDestination();
player.autostart = true;

player.sync().start(0);

let wave;



function mousePressed() {
    if (!ready) { // ! --> not

        Tone.start();
        ready = true;
    }

}