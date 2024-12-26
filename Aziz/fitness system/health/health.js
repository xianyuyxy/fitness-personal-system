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

// --------------------------------------check form---------------------------------------------
document.querySelectorAll('.status-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const form = this.parentElement.querySelector('.status-form');
        if (this.checked) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
});

// --------------------------------------Calendar functionality-------------------------------
class Calendar {
    constructor() {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.monthElement = document.getElementById('currentMonth');
        this.calendarElement = document.getElementById('calendar');

        this.initializeCalendar();
        this.addEventListeners();
    }

    initializeCalendar() {
        this.updateMonthDisplay();
        this.generateCalendar();
    }

    updateMonthDisplay() {
        const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this.monthElement.textContent = `${this.currentYear} ${months[this.currentMonth]}`;
    }

    generateCalendar() {
        this.calendarElement.innerHTML = '';

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            this.calendarElement.appendChild(emptyDay);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            if (this.isToday(day)) {
                dayElement.classList.add('today');
            }

            dayElement.addEventListener('click', () => this.handleDayClick(day));
            this.calendarElement.appendChild(dayElement);
        }

        const weekdays = document.querySelectorAll('.calendar-weekdays .weekday');
        const weekdayNames = {
            en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            cn: ['日', '一', '二', '三', '四', '五', '六']
        };

        weekdays.forEach((element, index) => {
            const lang = currentLanguage;
            element.textContent = weekdayNames[lang][index];
        });
    }

    isToday(day) {
        const today = new Date();
        return day === today.getDate() &&
            this.currentMonth === today.getMonth() &&
            this.currentYear === today.getFullYear();
    }

    handleDayClick(day) {
        const lang = currentLanguage;
        const message = {
            en: 'Do you want to mark this day as the start of your period?',
            cn: '你想将这一天标记为你的月经开始日吗？'
        };

        if (confirm(message[lang])) {
            this.markPeriodDays(day);
            this.updateHealthTips(true);
        }
    }


    markPeriodDays(startDay) {
        const days = document.querySelectorAll('.calendar-day');
        days.forEach(day => day.classList.remove('period'));

        for (let i = 0; i < 7; i++) {
            const targetDay = startDay + i;
            const dayElement = Array.from(days).find(el =>
                el.textContent === targetDay.toString() && !el.classList.contains('empty')
            );
            if (dayElement) {
                dayElement.classList.add('period');
            }
        }
    }

    addEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.initializeCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.initializeCalendar();
        });
    }
}

// --------------------------------------Update health tips--------------------------------
function updateHealthTips(isPeriod) {
    const tips = document.getElementById('healthTips');
    let baseText = `
        <h2 class="status-title" style="color: white;">Today's Health Reminder</h2>
        <p style="font-size: 18px; line-height: 1.6;">
          🌡️ It's cold outside, please note: <br>
          - Add clothing as needed <br>
          - Keep the room ventilated <br>
          - Drink warm water frequently
      `;

    if (isPeriod) {
        baseText += `<br><br>
          🌸 Period Reminder: <br>
          - Keep warm <br>
          - Exercise moderately <br>
          - Eat light food <br>
          - Stay in a positive mood
        `;
    }

    baseText += '</p>';
    tips.innerHTML = baseText;
}

const calendar = new Calendar();

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