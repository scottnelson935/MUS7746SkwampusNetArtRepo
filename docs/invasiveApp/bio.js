function newUserName() {
    var str = document.getElementById("username").value;
    storage.setItem('name', str);
    userName.innerText = str;
    console.log('value set to ' + str);
}

function newBio() {
    var bio = document.getElementById("biotext").value;
    storage.setItem('bio', bio);
    console.log('bio set to ' + bio);
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