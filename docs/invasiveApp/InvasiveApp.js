// geolocation

let cloc = function (pos) {
    let lat = pos.coords.latitude,
        long = pos.coords.longitude,
        coords = lat + ', ' + long;
    document.getElementById('google_map').setAttribute('src', 'https://maps.google.co.uk?q=' + coords + '&z=15&output=embed');
    console.log(coords);
}

document.getElementById('get_location').onclick = () => {
    navigator.geolocation.getCurrentPosition(cloc);
    console.log("nope");
    return false;
}

if ('geolocation' in navigator) {
    console.log('geolocation available');
} else {
    console.log('geolocation not available');
}

// username storage

let userName = document.getElementById('user');
let storage = window.localStorage;
const storedName = localStorage.getItem('name');
let name = storage.getItem('name');
if (userName.innerText === "no user" && !name) {
    name = 'Bob Howdy' + Math.trunc(Math.random() * 100)
    storage.setItem('name', name);
}
userName.innerText = name;