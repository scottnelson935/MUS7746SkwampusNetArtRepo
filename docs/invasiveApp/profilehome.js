let userName = document.getElementById('user');
let storage = window.localStorage;
let name = storage.getItem('name');
if (userName.innerText === "no user" && !name) {
    name = 'Bob Howdy' + Math.trunc(Math.random() * 100)
    storage.setItem('name', name);
}
userName.innerText = name;

let picStorage = window.localStorage;
let profile = picStorage.getItem('profile');
document.querySelector("img").src = profile;

let shortBio = document.getElementById('shortbio');
let bioStorage = window.localStorage;
let bio = storage.getItem('bio');
if (shortBio.innerText === "no bio" && !bio) {
    bio = 'You have not written a bio yet'
    storage.setItem('bio', bio);
}
shortBio.innerText = bio;