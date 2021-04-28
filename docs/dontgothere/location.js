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