const languageToggle = document.getElementById('languageToggle');
const languageElements = document.querySelectorAll('[data-lang]'); // Select elements with data-lang attribute

let currentLanguage = 'cn'; // Set default to Chinese

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

// ----------------------------------------sports' projects----------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const workoutItems = document.querySelectorAll('.workout-item');

    workoutItems.forEach(item => {
        item.addEventListener('click', function() {
            // Confirm completion
            if (!this.classList.contains('completed')) {
                if (confirm('你完成任务了吗?')) { // 提示确认
                    this.classList.add('completed');
                }
            } else {
                if (confirm('你完成任务了吗?')) {
                    this.classList.remove('completed');
                }
            }
        });
    });

    const workoutCells = document.querySelectorAll('.workout-cell');

    workoutCells.forEach(cell => {
        cell.addEventListener('click', function(e) {
            // Prevent triggering the completion confirm
            e.stopPropagation();

            const action = prompt('你想做什么？(修改, 删除, 添加)'); // 中文提示
            if (action) {
                switch (action.toLowerCase()) {
                    case '修改':
                        modifyWorkout(this);
                        break;
                    case '删除':
                        deleteWorkout(this);
                        break;
                    case '添加':
                        addWorkout(this);
                        break;
                    default:
                        alert('无效的操作。请键入“修改”、“删除”或“添加”。'); // 中文提示
                }
            }
        });
    });

    function modifyWorkout(cell) {
        const item = cell.querySelector('.workout-item');
        if (item) {
            const newContent = prompt('输入新的锻炼细节:', item.textContent);
            if (newContent) {
                item.innerHTML = newContent;
            }
        } else {
            alert('没有可以修改的锻炼项目!');
        }
    }

    function deleteWorkout(cell) {
        const item = cell.querySelector('.workout-item');
        if (item) {
            const confirmDelete = confirm('你确定要删除这个锻炼吗?');
            if (confirmDelete) {
                cell.removeChild(item);
            }
        } else {
            alert('没有可以删除的锻炼项目!');
        }
    }

    function addWorkout(cell) {
        const newWorkout = prompt('输入要添加的锻炼细节:');
        if (newWorkout) {
            const newItem = document.createElement('div');
            newItem.classList.add('workout-item');
            newItem.innerHTML = newWorkout;
            cell.appendChild(newItem);
            newItem.addEventListener('click', function() {
                // Add completion functionality to the new item
                if (!this.classList.contains('completed')) {
                    if (confirm('你完成任务了吗?')) { // 提示确认
                        this.classList.add('completed');
                    }
                } else {
                    if (confirm('你完成任务了吗?')) {
                        this.classList.remove('completed');
                    }
                }
            });
        }
    }
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
