let userName = document.getElementById('user');
let storage = window.localStorage;
let name = storage.getItem('name');
if (userName.innerText === "no user" && !name) {
    name = 'Bob Howdy' + Math.trunc(Math.random() * 100)
    storage.setItem('name', name);
}
userName.innerText = name;

let caption = document.getElementById('desc');
let caption2 = document.getElementById('desc2');
let caption3 = document.getElementById('desc3');
let caption4 = document.getElementById('desc4');

let captions = ["Whatever is good for your soul, do that",
    "Even the stars were jealous of the sparkle in her eyes",
    "Stress less and enjoy the best",
    "Get out there and live a little",
    "I’m not high maintenance, you’re just low effort",
    "I’m not gonna sugar coat the truth, I’m not Willy Wonka",
    "Life is better when you’re laughing",
    "Look for the magic in every moment",
    "Vodka may not be the answer but it’s worth a shot",
    "A sass a day keeps the basics away",
    "Typical me",
    "Hella fine and it works every time – Ariana Grande",
    "Hustlin",
    "When daydreams become reality",
    "Influencer life",
    "Sometimes relationships end so love stories can begin",
    "I would never let my best friend do anything stupid…alone",
    "Back in the old days my best friend why quiet and shy. I turned her into a monster. 😜",
    "Miss me?",
    "Don’t trust everything you see, even salt can look like sugar",
    "When I started counting my blessings, I realized I have everything I could ever need",
    "There’s a dream that I’ve been chasing want so badly for it to be reality – Justin Bieber",
    "If you want opportunity to knock, it’s time to build a door",
    "#Goals",
    "You were my cup of tea but I drink wine now",
    "I’m the reason why I smile everyday",
    "I travel because you can always get more money, but you can never get more time",
]

if (caption.innerText === 'caption') {
    let index = getRandomNumber(0, captions.length - 1)
    caption.innerText = captions[index];
}

if (caption2.innerText === 'caption') {
    let index = getRandomNumber(0, captions.length - 1)
    caption2.innerText = captions[index];
}

if (caption3.innerText === 'caption') {
    let index = getRandomNumber(0, captions.length - 1)
    caption3.innerText = captions[index];
}

if (caption4.innerText === 'caption') {
    let index = getRandomNumber(0, captions.length - 1)
    caption4.innerText = captions[index];
}

function getRandomNumber(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;

    return result;
}



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