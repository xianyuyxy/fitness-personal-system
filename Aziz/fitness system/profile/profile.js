const languageToggle = document.getElementById('languageToggle');
const languageElements = document.querySelectorAll('[data-lang]'); // Select elements with data-lang attribute

let currentLanguage = 'cn';

function switchLanguage(lang) {
    currentLanguage = lang;
    languageElements.forEach(element => {
        const translations = JSON.parse(element.dataset.lang);
        element.textContent = translations[lang];
        if (element.placeholder) {
            element.placeholder = translations[lang];
        }
    });
    languageToggle.checked = (lang === 'en');
}

switchLanguage(currentLanguage);

languageToggle.addEventListener('change', function() {
    if (this.checked) {
        switchLanguage('en');
    } else {
        switchLanguage('cn');
    }
});

// -------------------------------Navigation item click effect-----------------------------
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

//--------------------------------music--------------------------------------
const audioPlayer = document.getElementById("audioPlayer");

function toggleAudio() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

audioPlayer.addEventListener('play', function() {
    localStorage.setItem('audioStatus', 'playing');
});

audioPlayer.addEventListener('pause', function() {
    localStorage.setItem('audioStatus', 'paused');
});

window.onload = function() {
    const audioStatus = localStorage.getItem('audioStatus');
    if (audioStatus === 'playing') {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
};