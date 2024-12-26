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

languageToggle.addEventListener('change', function () {
    if (this.checked) {
        switchLanguage('en');
    } else {
        switchLanguage('cn');
    }
});

// -------------------------------Navigation item click effect-----------------------------
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function () {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// -----------------------------------calender--------------------------------------
const calendarGrid = document.querySelector('.calendar-grid');
let notes = {};
const modal = document.getElementById("noteModal");
const closeModal = document.querySelector(".close");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const noteText = document.getElementById("noteText");
const modalTitle = document.getElementById("modalTitle");
let currentDay = null;

const storedNotes = localStorage.getItem('calendarNotes');
if (storedNotes) {
    notes = JSON.parse(storedNotes);
}

function loadNote(day) {
    return notes[day] || '';
}

function saveNote(day, note) {
    notes[day] = note;
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
}

for (let i = 1; i <= 31; i++) {
    const day = document.createElement('div');
    day.className = 'calendar-day';
    if (i === 5) day.className += ' active';
    if (i === 1 || i === 14) day.className += ' completed';
    day.textContent = i;
    calendarGrid.appendChild(day);

    day.addEventListener('click', function () {
        currentDay = i;
        const existingNote = loadNote(i);

        modalTitle.textContent = `第${i}的备注`;
        noteText.value = existingNote || '';

        modal.style.display = "block";
    });
}

saveNoteBtn.addEventListener('click', function () {
    const note = noteText.value;
    if (note !== null) {
        saveNote(currentDay, note);
        alert('你的备注修改好了！');
        modal.style.display = "none";
    }
});

closeModal.addEventListener('click', function () {
    modal.style.display = "none";
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// -----------------------------------------habit-------------------------------------
const habitsList = document.querySelector('.habits-list');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitModal = document.getElementById('habitModal');
const Title = document.getElementById('modalTitle');
const habitNameInput = document.getElementById('habitName');
const habitTrainerInput = document.getElementById('habitTrainer');
const habitProgressInput = document.getElementById('habitProgress');
const saveHabitBtn = document.getElementById('saveHabitBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

let editingHabitIndex = null;

const habits = [
    {name: '{"en": "Stretching", "cn": "拉伸"}', trainer: 'Alice McCain', progress: 75},
    {name: '{"en": "Yoga training", "cn": "瑜伽训练"}', trainer: 'Jennifer Lubin', progress: 60},
    {name: '{"en": "Massage", "cn": "按摩"}', trainer: 'Johnson Cooper', progress: 40},
    {name: '{"en": "Ab exercises", "cn": "腹部锻炼"}', trainer: '', progress: 80}
];

const buttonTranslations = {
    edit: {
        en: 'Edit',
        cn: '修改'
    },
    delete: {
        en: 'Delete',
        cn: '删除'
    }
};

function applyButtonStyles() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.style.padding = '5px 10px';
        button.style.margin = '5px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.backgroundColor = '#57af57';
        button.style.color = 'white';

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#448844';
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#57af57';
            button.style.transform = 'scale(1)';
        });
    });

    deleteButtons.forEach(button => {
        button.style.padding = '5px 10px';
        button.style.margin = '5px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.backgroundColor = '#9b79ea';
        button.style.color = 'white';

        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#7f64bd';
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#9b79ea';
            button.style.transform = 'scale(1)';
        });
    });
}

function renderHabits() {
    habitsList.innerHTML = '';

    habits.forEach((habit, index) => {
        const habitItem = document.createElement('div');
        habitItem.className = 'habit-item';
        habitItem.dataset.index = index;

        const habitName = JSON.parse(habit.name)[currentLanguage];

        habitItem.innerHTML = `
            <div class="habit-info">
                <h3>${habitName}</h3>
                ${habit.trainer ? `<p data-lang='{"en": "Trainer:", "cn": "教练："}'>教练: ${habit.trainer}</p>` : ''}
            </div>
            <div class="habit-progress">
                <div class="habit-progress-bar" style="width: ${habit.progress}%"></div>
            </div>
            <button class="edit-btn">${buttonTranslations.edit[currentLanguage]}</button>
            <button class="delete-btn">${buttonTranslations.delete[currentLanguage]}</button>
        `;

        habitsList.appendChild(habitItem);

        // Edit button click
        habitItem.querySelector('.edit-btn').addEventListener('click', () => {
            editingHabitIndex = index;
            const habit = habits[index];
            const habitData = JSON.parse(habit.name);
            habitNameInput.value = habitData[currentLanguage];
            habitTrainerInput.value = habit.trainer;
            habitProgressInput.value = habit.progress;

            modalTitle.textContent = currentLanguage === 'en' ?
                `Edit Habit - ${habitData[currentLanguage]}` :
                `修改习惯 - ${habitData[currentLanguage]}`;
            habitModal.style.display = 'block';
        });

        // Delete button click
        habitItem.querySelector('.delete-btn').addEventListener('click', () => {
            habits.splice(index, 1);
            renderHabits();
        });
    });

    applyButtonStyles();
}

// Save habit changes
saveHabitBtn.addEventListener('click', () => {
    const habitName = habitNameInput.value;
    const habitTrainer = habitTrainerInput.value;
    const habitProgress = parseInt(habitProgressInput.value);

    if (editingHabitIndex !== null) {
        const habit = habits[editingHabitIndex];
        const habitData = JSON.parse(habit.name);
        habitData[currentLanguage] = habitName;
        habit.name = JSON.stringify(habitData);
        habit.trainer = habitTrainer;
        habit.progress = habitProgress;
    } else {
        const newHabit = {
            name: JSON.stringify({en: habitName, cn: habitName}),
            trainer: habitTrainer,
            progress: habitProgress
        };
        habits.push(newHabit);
    }

    habitModal.style.display = 'none';
    renderHabits();
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    habitModal.style.display = 'none';
});

// Add new habit button
addHabitBtn.addEventListener('click', () => {
    editingHabitIndex = null;
    habitNameInput.value = '';
    habitTrainerInput.value = '';
    habitProgressInput.value = '';
    modalTitle.textContent = currentLanguage === 'en' ? 'Add New Habit' : '添加新习惯';
    habitModal.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function () {
    renderHabits();
});

//--------------------------------------------- update language-------------------------------------------
function updateHabitNames() {
    const habitItems = document.querySelectorAll('.habit-item');
    habitItems.forEach((item, index) => {
        const habitName = JSON.parse(habits[index].name)[currentLanguage];
        const trainerText = currentLanguage === 'en' ? 'Trainer:' : '教练：';
        item.querySelector('h3').textContent = habitName;
        if (item.querySelector('p')) {
            item.querySelector('p').textContent = trainerText + ' ' + habits[index].trainer;
        }
        item.querySelector('.edit-btn').textContent = buttonTranslations.edit[currentLanguage];
        item.querySelector('.delete-btn').textContent = buttonTranslations.delete[currentLanguage];
    });
}

languageToggle.addEventListener('change', function () {
    updateHabitNames();
});

// ----------------------------------------------steps-----------------------------------------------------
const today = new Date().getDay();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let stepData = [3000, 5000, 7000, 8000, 6000, 9000, 4000];

const todayIndex = today === 0 ? 6 : today - 1;

const ctx = document.getElementById('stepsChart').getContext('2d');

const stepsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: '👣',
            data: stepData,
            fill: false,
            borderColor: '#8a3ab9',
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: (context) => {
                return context.dataIndex === todayIndex ? '#98FF98' : '#8a3ab9';
            },
            pointBorderColor: '#8a3ab9',
            pointRadius: (context) => {
                return context.dataIndex === todayIndex ? 6 : 4;
            }
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1000
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (context) {
                        const index = context[0].dataIndex;
                        return index === todayIndex ? days[index] + ' (Today)' : days[index];
                    }
                }
            }
        }
    }
});

// ----------------------------------------------update steps----------------------------------------
function updateChart() {
    const todaySteps = parseInt(document.getElementById('todaySteps').value);

    if (isNaN(todaySteps) || todaySteps < 0) {
        alert("please enter valid steps！");
        return;
    }

    stepData[todayIndex] = todaySteps;

    stepsChart.data.datasets[0].data = stepData;
    stepsChart.update();

    document.getElementById('todaySteps').value = '';
}

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('todaySteps');
    input.placeholder = `please enter today steps (${days[todayIndex]})`;
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

audioPlayer.addEventListener('play', function () {
    localStorage.setItem('audioStatus', 'playing');
});

audioPlayer.addEventListener('pause', function () {
    localStorage.setItem('audioStatus', 'paused');
});

window.onload = function () {
    const audioStatus = localStorage.getItem('audioStatus');
    if (audioStatus === 'playing') {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
};

// -----------------------------------mobile user friendly------------------------------
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');

    toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});
