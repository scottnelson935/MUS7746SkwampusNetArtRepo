let ready = false;

document.getElementById("toggle").addEventListener("click", async () => {
    await Tone.start();
    console.log("audio enabled");
});

class Instrument {
    constructor() {
        this.synth = null;
        this.gain = new Tone.Gain();
        this.gain.toDestination();
        this.tick = 0;
        this.initializeTransport();
    }

    initializeTransport() {
        let notes1 = "B C# D E F G A B".split(' ').map(n => `${n}4`);
        let notes = notes1;
        Tone.Transport.scheduleRepeat(time => {
            let note = notes[(this.tick) % notes.length];
            console.log(note);
            if (this.synth) this.synth.triggerAttackRelease(note, "8n", time);
            this.tick++;
        }, "4n");

        //Tone.Transport.start();
    }



    toggle() {
        this.playing = !this.playing;
        if (this.playing) Tone.Transport.start();
        else Tone.Transport.stop();
    }

    update(synthType, oscillatorType, oscillatorPartials, envelope) {
        this._updateSynthType(synthType, envelope);
        this._updateOscillatorType(oscillatorType, oscillatorPartials);
    }

    updateEnvelope({ attack }) {
        if (attack !== undefined) this.synth.envelope.attack = attack;
    }

    _updateSynthType(synthType, envelope) {
        if (this.Synth) {
            this.synth.disconnect(this.gain);
            this.synth.dispose();
        }
        let settings = this.defaultSettings[synthType] || {};
        settings.envelope = Object.assign(settings.envelope, envelope);
        this.synth = new Tone[synthType](settings);
        this.synth.connect(this.gain);
    }

    _updateOscillatorType(oscillatorType, oscillatorPartials) {
        let partials = oscillatorPartials === 'none' ? '' : oscillatorPartials;
        this.synth.oscillator.type = `${oscillatorType}${partials}`;
        console.log('Updating type', `${oscillatorType}${partials}`);
    }

    get defaultSettings() {
        return {
            Synth: {
                oscillator: { type: 'triangle' },
                envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1
                }
            },
            AMSynth: {
                harmonicity: 3,
                detune: 0,
                oscillator: {
                    type: 'sine'
                },
                envelope: {
                    attack: 0.01,
                    decay: 0.01,
                    sustain: 1,
                    release: 0.5
                },
                modulation: {
                    type: 'square'
                },
                modulationEnvelope: {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5
                }
            },
            FMSynth: {
                harmonicity: 3,
                modulationIndex: 10,
                detune: 0,
                oscillator: {
                    type: 'sine'
                },
                envelope: {
                    attack: 0.01,
                    decay: 0.01,
                    sustain: 1,
                    release: 0.5
                },
                modulation: {
                    type: 'square'
                },
                modulationEnvelope: {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5
                }
            }
        };
    }
}

let $synthType = document.querySelector('#synth-type');
let $oscillatorType = document.querySelector('#oscillator-type');
let $oscillatorPartials = document.querySelector('#oscillator-partials');
let $toggle = document.querySelector('#toggle');
let $envelopeAttack = document.querySelector('#envelope-attack');
let $envelopeDecay = document.querySelector('#envelope-decay');
let $envelopeSustain = document.querySelector('#envelope-sustain');
let $envelopeRelease = document.querySelector('#envelope-release');
let inst = new Instrument();
let s = document.getElementById("synth-div");

let steps = [0, 0.001, 0.005, 0.01, 0.05, 0.1, 0.125, 0.25, 0.5, 0.75];

$envelopeAttack.addEventListener('change', update);
$envelopeDecay.addEventListener('change', update);
$envelopeSustain.addEventListener('change', update);
$envelopeRelease.addEventListener('change', releaseChange);

$toggle.addEventListener('click', e => {
    inst.toggle();
    if ($toggle.className.match('is-success')) {
        $toggle.classList.remove('is-success');
        $toggle.classList.add('is-danger');
    } else {
        $toggle.classList.add('is-success');
        $toggle.classList.remove('is-danger');
    }
    $toggle.classList.toggle('active');
});

inst._updateSynthType($synthType.value);

$synthType.addEventListener('change', update);
$oscillatorType.addEventListener('change', update);
$oscillatorPartials.addEventListener('change', update);

function releaseChange() {
    let notes = notes2;
    update();
}

function update() {
    let envelope = {
        attack: steps[parseInt($envelopeAttack.value)],
        decay: steps[parseInt($envelopeDecay.value)],
        sustain: steps[parseInt($envelopeSustain.value)],
        release: steps[parseInt($envelopeRelease.value)],
    };
    inst.update(
        $synthType.value,
        $oscillatorType.value,
        $oscillatorPartials.value,
        envelope
    );
}

let attSlider = document.getElementById("envelope-attack");
let attValue = document.getElementById("attack-value");
attSlider.onchange = () => {
    attValue.value = attSlider.value
    console.log(attSlider.value);
}

let decSlider = document.getElementById("envelope-decay");
let decValue = document.getElementById("decay-value");
decSlider.onchange = () => {
    decValue.value = decSlider.value
    console.log(decSlider.value);
}

let susSlider = document.getElementById("envelope-sustain");
let susValue = document.getElementById("sustain-value");
susSlider.onchange = () => {
    susValue.value = susSlider.value
    console.log(susSlider.value);
}

let relSlider = document.getElementById("envelope-release");
let relValue = document.getElementById("release-value");
relSlider.onchange = () => {
    relValue.value = relSlider.value
    console.log(relSlider.value);
}

//random url results//

var urlArray = [
    "dancehall.html",
    "static.html",
    "everest.html",
    "discocar.html",
    "dip.html",
    "graceland.html"
];

function randomUrl() {
    var randomNumber = Math.floor(Math.random() * urlArray.length);
    var newUrl = urlArray[randomNumber];
    window.location.href = newUrl;
}

// //Geolocation//

// let c = function (pos) {
//     let lat = pos.coords.latitude,
//         long = pos.coords.longitude,
//         coords = lat + ', ' + long;
//     document.getElementById('google_map').setAttribute('src', 'https://maps.google.co.uk?q=' + coords + '&z=15&output=embed');
// }

// document.getElementById('get_location').onclick = function () {
//     navigator.geolocation.getCurrentPosition(c);
//     return false;
// }

// if ('geolocation' in navigator) {
//     console.log('geolocation available');
//     navigator.geolocation.getCurrentPosition(position => {
//         console.log(position.coords);
//     });
// } else {
//     console.log('geolocation not available');
// }

// function mousePressed() {
//     if (!ready) { // ! --> not

//         Tone.start();
//         ready = true;
//     }

// }