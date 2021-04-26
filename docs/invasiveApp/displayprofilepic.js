let picStorage = window.localStorage;
let profile = picStorage.getItem('profile');
document.querySelector("img").src = profile;

let userName = document.getElementById('user');
let storage = window.localStorage;
const storedName = localStorage.getItem('name');
let name = storage.getItem('name');
if (userName.innerText === "no user" && !name) {
    name = 'Bob Howdy' + Math.trunc(Math.random() * 100)
    storage.setItem('name', name);
}
userName.innerText = name;