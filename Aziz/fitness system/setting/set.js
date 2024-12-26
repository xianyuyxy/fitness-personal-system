const languageToggle = document.getElementById('languageToggle');
const languageElements = document.querySelectorAll('[data-lang]');

// 定义所有需要翻译的文本
const translations = {
    en: {
        signIn: "Sign In",
        signUp: "Sign Up",
        nickname: "Nickname",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm Password",
        signInButton: "Sign In",
        signUpButton: "Sign Up",
        noAccount: "Don't have an account? Sign Up",
        haveAccount: "Already have an account? Sign In",
        // 错误信息翻译
        fillFields: "Please fill in all fields",
        passwordRule: "Password must contain letters and numbers, length 9-13 characters",
        passwordMatch: "Passwords do not match",
        emailRegistered: "Email already registered",
        registerSuccess: "Registration successful! Please sign in",
        invalidCredentials: "Invalid email or password",
        loginSuccess: "Login successful! Redirecting..."
    },
    cn: {
        signIn: "登录",
        signUp: "注册",
        nickname: "昵称",
        email: "邮箱",
        password: "密码",
        confirmPassword: "确认密码",
        signInButton: "登录",
        signUpButton: "注册",
        noAccount: "没有账号？立即注册",
        haveAccount: "已有账号？立即登录",
        // 错误信息翻译
        fillFields: "请填写所有字段",
        passwordRule: "密码必须包含字母和数字，长度9-13位",
        passwordMatch: "两次输入的密码不匹配",
        emailRegistered: "该邮箱已注册",
        registerSuccess: "注册成功！请登录",
        invalidCredentials: "邮箱或密码错误",
        loginSuccess: "登录成功！正在跳转..."
    }
};

let currentLanguage = 'cn';

function updateUILanguage(lang) {
    // 更新表单标题
    document.querySelector('.signin h2').textContent = translations[lang].signIn;
    document.querySelector('.signup h2').textContent = translations[lang].signUp;

    // 更新输入框占位符
    document.getElementById('login-nickname').placeholder = translations[lang].nickname;
    document.getElementById('login-email').placeholder = translations[lang].email;
    document.getElementById('login-password').placeholder = translations[lang].password;
    document.getElementById('signup-email').placeholder = translations[lang].email;
    document.getElementById('signup-password').placeholder = translations[lang].password;
    document.getElementById('signup-confirm-password').placeholder = translations[lang].confirmPassword;

    // 更新按钮文本
    document.querySelector('.signin button').textContent = translations[lang].signInButton;
    document.querySelector('.signup button').textContent = translations[lang].signUpButton;
    document.querySelector('.signin button:not(.toggle-btn)').textContent = translations[lang].signInButton;
    document.querySelector('.signup button:not(.toggle-btn)').textContent = translations[lang].signUpButton;

    // 更新切换表单按钮文本
    document.querySelector('.signin .toggle-btn').textContent = translations[lang].noAccount;
    document.querySelector('.signup .toggle-btn').textContent = translations[lang].haveAccount;

    // 更新导航栏文本
    languageElements.forEach(element => {
        const navTranslations = JSON.parse(element.dataset.lang);
        element.textContent = navTranslations[lang];
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    updateUILanguage(lang);
    languageToggle.checked = (lang === 'en');
}

// 初始化为中文
switchLanguage('cn');
languageToggle.checked = false;

languageToggle.addEventListener('change', function() {
    if (this.checked) {
        switchLanguage('en');
    } else {
        switchLanguage('cn');
    }
});

let users = [];

// 修改错误消息显示函数
function showMessage(elementId, messageKey, type = 'error') {
    const messageElement = document.getElementById(elementId);
    messageElement.className = type + '-message';
    messageElement.textContent = translations[currentLanguage][messageKey];
}

// 在signup函数中添加localStorage存储
function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!email || !password || !confirmPassword) {
        showMessage('signup-message', 'fillFields');
        return;
    }

    if (!validatePassword(password)) {
        showMessage('signup-message', 'passwordRule');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('signup-message', 'passwordMatch');
        return;
    }

    // 从localStorage获取现有用户
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if (existingUsers.some(user => user.email === email)) {
        showMessage('signup-message', 'emailRegistered');
        return;
    }

    // 添加新用户并保存到localStorage
    existingUsers.push({ email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    showMessage('signup-message', 'registerSuccess', 'success');

    setTimeout(() => {
        toggleForm('signin');
    }, 1500);
}

// 修改login函数以使用localStorage
function login() {
    const nickname = document.getElementById('login-nickname').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!nickname || !email || !password) {
        showMessage('login-message', 'fillFields');
        return;
    }

    // 从localStorage获取用户数据
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // 保存登录状态
        localStorage.setItem('currentUser', JSON.stringify({
            nickname: nickname,
            email: email
        }));

        showMessage('login-message', 'loginSuccess', 'success');
        setTimeout(() => {
            window.location.href = '../home/home.html';
        }, 1500);
    } else {
        showMessage('login-message', 'invalidCredentials');
    }
}

// 页面加载时初始化用户数据
window.onload = function() {
    // 获取音频状态
    const audioStatus = localStorage.getItem('audioStatus');
    if (audioStatus === 'playing') {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }

    // 初始化用户数组
    users = JSON.parse(localStorage.getItem('users') || '[]');
}

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

function toggleForm(form) {
    const signinForm = document.querySelector('.signin');
    const signupForm = document.querySelector('.signup');

    // 清除错误消息
    document.getElementById('login-message').textContent = '';
    document.getElementById('signup-message').textContent = '';

    if (form === 'signup') {
        signinForm.style.transform = 'rotateY(180deg)';
        signupForm.style.transform = 'rotateY(0deg)';
    } else {
        signinForm.style.transform = 'rotateY(0deg)';
        signupForm.style.transform = 'rotateY(180deg)';
    }
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,13}$/;
    return passwordRegex.test(password);
}

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
