const languageToggle = document.getElementById('languageToggle');
const languageElements = document.querySelectorAll('[data-lang]');

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
// ----------------------------------------carousel------------------------------------------------
let currentIndex = 0;
const images = document.querySelectorAll(".carousel-images img");
const totalImages = images.length;

function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    const carouselImages = document.querySelector(".carousel-images");
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(() => {
    moveSlide(1);
}, 3000);

// --------------------------------------comment-------------------------------------
const commentSection = document.querySelector('.comment');

let commentIdCounter = 0;

function createCommentElement(username, commentText) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-item');
    commentDiv.setAttribute('data-id', commentIdCounter);

    const usernamePara = document.createElement('p');
    usernamePara.textContent = `用户: ${username}`;

    const commentPara = document.createElement('p');
    commentPara.textContent = commentText;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.dataset.lang = JSON.stringify({
        cn: '编辑',
        en: 'Edit'
    });
    editButton.textContent = '编辑';
    editButton.addEventListener('click', function () {
        const newText = prompt('请输入新评论:', commentPara.textContent);
        if (newText !== null) {
            commentPara.textContent = newText;
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.dataset.lang = JSON.stringify({
        cn: '删除',
        en: 'Delete'
    });
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', function () {
        commentSection.removeChild(commentDiv);
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    commentDiv.appendChild(usernamePara);
    commentDiv.appendChild(commentPara);
    commentDiv.appendChild(buttonContainer);

    commentIdCounter++;
    return commentDiv;
}

const initialComment = createCommentElement('用户1', '我爱社区!');
commentSection.appendChild(initialComment);
const initialComment2 = createCommentElement('用户2', '我也爱社区!');
commentSection.appendChild(initialComment2);

function updateCommentLanguage(lang) {
    const commentItems = document.querySelectorAll('.comment-item');
    commentItems.forEach(item => {
        const editButton = item.querySelector('.edit-btn');
        const deleteButton = item.querySelector('.delete-btn');

        const editTranslations = JSON.parse(editButton.dataset.lang);
        const deleteTranslations = JSON.parse(deleteButton.dataset.lang);

        editButton.textContent = editTranslations[lang];
        deleteButton.textContent = deleteTranslations[lang];
    });
}

switchLanguage(currentLanguage);

languageToggle.addEventListener('change', function () {
    if (this.checked) {
        switchLanguage('en');
    } else {
        switchLanguage('cn');
    }
    updateCommentLanguage(currentLanguage);
});

// --------------------------------------------button style----------------------------------
const addCommentButton = document.createElement('button');
addCommentButton.textContent = '增加评论';
addCommentButton.classList.add('add-comment-btn');
addCommentButton.addEventListener('click', function () {
    const username = prompt('请输入用户名:');
    const commentText = prompt('请输入评论内容:');
    if (username && commentText) {
        const newComment = createCommentElement(username, commentText);
        commentSection.appendChild(newComment);
    }
});

document.body.appendChild(addCommentButton);
addCommentButton.style.position = 'relative';
addCommentButton.style.bottom = '470px';
addCommentButton.style.left = '26%';
addCommentButton.style.transform = 'translateX(-50%)';
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
