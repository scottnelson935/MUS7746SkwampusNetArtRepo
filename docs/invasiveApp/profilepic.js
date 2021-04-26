'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const errorMsgElement = document.getElementById('span#ErrorMsg');
let picStorage = window.localStorage;

const constraints = {
    audio: false,
    video: {
        width: 640, height: 480
    }
};

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    }
    catch (e) {
        errorMsgElement.innerHTML = `navigator.getUserMedia.error:${e.toString()}`
    }
}

function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

init();

var context = canvas.getContext('2d');

snap.addEventListener("click", function () {
    context.drawImage(video, 0, 0, 640, 480);
    var dataURL = canvas.toDataURL('image/jpeg', 0.1);
    picStorage.setItem('profile', dataURL);
});

//get dataURL

// let profile = picStorage.getItem('profile');

var a = 1;
function show_hide() {
    if (a == 1) {
        document.getElementById("nailed").classList.remove("invisible");
        return a = 0;
    }
    else {
        document.getElementById("nailed").classList.add("invisible");
    }
}



let userName = document.getElementById('user');
let storage = window.localStorage;
const storedName = localStorage.getItem('name');
let name = storage.getItem('name');
if (userName.innerText === "no user" && !name) {
    name = 'Bob Howdy' + Math.trunc(Math.random() * 100)
    storage.setItem('name', name);
}
userName.innerText = name;