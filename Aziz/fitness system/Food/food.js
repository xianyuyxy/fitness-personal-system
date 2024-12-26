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

//------------------------------------------------------主要部分--------------------------------------------------
const recipes = [
    {
        name: "Quinoa Buddha Bowl",
        description: "A nutrient-rich bowl with quinoa, roasted vegetables, and tahini dressing",
        calories: 420,
        protein: 15,
        carbs: 65,
        tags: ["Vegetarian", "High Fiber", "Gluten-Free"],
        category: "vegetarian",
        image: "藜麦佛碗.jpg"  },
    {
        name: "Grilled Chicken Breast",
        description: "Lean protein with steamed broccoli and sweet potato",
        calories: 380,
        protein: 42,
        carbs: 25,
        tags: ["High Protein", "Low Fat", "Gym Diet"],
        category: "highProtein",
        image: "烤鸡胸肉.jpg"   },
    {
        name: "Avocado Tuna Bowl",
        description: "Low-carb bowl with fresh tuna, avocado, and mixed greens",
        calories: 310,
        protein: 28,
        carbs: 8,
        tags: ["Keto", "Low Carb", "Seafood"],
        category: "lowCarb",
        image: "鳄梨金枪鱼碗.jpg"   },
    {
        name: "Overnight Oats",
        description: "Protein-packed breakfast with oats, chia seeds, and berries",
        calories: 350,
        protein: 14,
        carbs: 45,
        tags: ["Breakfast", "Meal Prep", "High Fiber"],
        category: "breakfast",
        image: "酸奶碗.jpg"   },
    {
        name: "Mediterranean Salad",
        description: "Fresh salad with feta, olives, and olive oil dressing",
        calories: 280,
        protein: 12,
        carbs: 15,
        tags: ["Vegetarian", "Low Calorie", "Mediterranean"],
        category: "vegetarian",
        image: "沙拉.jpg"  }
];

function createRecipeCard(recipe) {
    return `
        <div class="recipe-card">
            <div class="recipe-image" style="background-image: url('${recipe.image}')"></div>
            <div class="recipe-content">
                <h3>${recipe.name}</h3>
                <div class="tags">
                    ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>${recipe.description}</p>
                <div class="recipe-stats">
                    <div class="stat">
                        <span class="stat-value">${recipe.calories}</span>
                        <span class="stat-label">Calories</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${recipe.protein}g</span>
                        <span class="stat-label">Protein</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${recipe.carbs}g</span>
                        <span class="stat-label">Carbs</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createRecipeCard(recipe) {
    return `
        <div class="recipe-card">
            <div class="recipe-image" style="background-image: url('${recipe.image}')"></div>
            <div class="recipe-content">
                <h3>${recipe.name}</h3>
                <div class="tags">
                    ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>${recipe.description}</p>
                <div class="recipe-stats">
                    <div class="stat">
                        <span class="stat-value">${recipe.calories}</span>
                        <span class="stat-label">Calories</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${recipe.protein}g</span>
                        <span class="stat-label">Protein</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${recipe.carbs}g</span>
                        <span class="stat-label">Carbs</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayRecipes(filteredRecipes = recipes) {
    const recipeGrid = document.getElementById('recipeGrid');
    recipeGrid.innerHTML = filteredRecipes
        .map(recipe => createRecipeCard(recipe))
        .join('');
}

function filterRecipesByCategory(category) {
    return category === 'all'
        ? recipes
        : recipes.filter(recipe => recipe.category === category);
}

function handleCategoryClick(e) {
    if (e.target.classList.contains('category-btn')) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        const category = e.target.dataset.category;
        const filteredRecipes = filterRecipesByCategory(category);
        displayRecipes(filteredRecipes);
    }
}

function searchRecipes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    displayRecipes(filteredRecipes);
}

const sidebarCategoryBtns = document.getElementById('categorySidebar').querySelectorAll('.category-btn');
sidebarCategoryBtns.forEach(btn => {
    btn.addEventListener('click', handleCategoryClick);
});

document.getElementById('categoryFilter').addEventListener('click', handleCategoryClick);

displayRecipes();


let currentLanguage = 'cn';

function changeLanguage() {
    const links = document.querySelectorAll('[data-lang]');
    links.forEach(link => {
        const langData = JSON.parse(link.dataset.lang);
        link.textContent = langData[currentLanguage];
    });

    const headerTitle = document.querySelector('header h1');
    const headerDesc = document.querySelector('header p');
    headerTitle.textContent = currentLanguage === 'en' ? 'Healthy Recipe Collection' : '健康食谱集';
    headerDesc.textContent = currentLanguage === 'en' ? 'Discover nutritious and delicious meals' : '发现营养又美味的餐食';

    const categoryFilterBtns = document.querySelectorAll('.category-filter button');
    categoryFilterBtns.forEach(btn => {
        const btnDataLang = btn.dataset.category === 'all' ? {"en": "All", "cn": "全部"} :
            (btn.dataset.category === 'vegetarian' ? {"en": "Vegetarian", "cn": "素食"} :
                (btn.dataset.category === 'lowCarb' ? {"en": "Low Carb", "cn": "低碳水"} :
                    (btn.dataset.category === 'highProtein' ? {"en": "High Protein", "cn": "高蛋白"} :
                        {"en": "Breakfast", "cn": "早餐"})));
        btn.textContent = btnDataLang[currentLanguage];
    });

    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        const recipeName = card.querySelector('h3');
        const recipeNameDataLang = JSON.parse(recipeName.dataset.lang);
        recipeName.textContent = recipeNameDataLang[currentLanguage];

        const recipeDesc = card.querySelector('p');
        const recipeDescDataLang = JSON.parse(recipeDesc.dataset.lang);
        recipeDesc.textContent = recipeDescDataLang[currentLanguage];

        const recipeTags = card.querySelectorAll('.tag');
        recipeTags.forEach(tag => {
            const tagDataLang = JSON.parse(tag.dataset.lang);
            tag.textContent = tagDataLang[currentLanguage];
        });
    });
}

const languageSwitchBtn = document.getElementById('language-switch-btn');
languageSwitchBtn.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'cn' : 'en';
    changeLanguage();
});

changeLanguage();

function createRecipeCard(recipe) {
    return `
    <div class="recipe-card">
        <div class="recipe-image" style="background-image: url('${recipe.image}')"></div>
        <div class="recipe-content">
            <h3 data-lang='{"en": "${recipe.name}", "cn": "${getChineseRecipeName(recipe.name)}"}'>${recipe.name}</h3>
            <div class="tags">
                ${recipe.tags.map(tag => `<span class="tag" data-lang='{"en": "${tag}", "cn": "${getChineseTagName(tag)}"}'>${tag}</span>`).join('')}
            </div>
            <p data-lang='{"en": "${recipe.description}", "cn": "${getChineseRecipeDescription(recipe.description)}"}'>${recipe.description}</p>
            <div class="recipe-stats">
                <div class="stat">
                    <span class="stat-value">${recipe.calories}</span>
                    <span class="stat-label">Calories</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${recipe.protein}g</span>
                    <span class="stat-label">Protein</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${recipe.carbs}g</span>
                    <span class="stat-label">Carbs</span>
                </div>
            </div>
        </div>
    </div>
    `;
}

// 以下是辅助函数，用于根据英文名称获取对应的中文名称、标签、描述等，你需要根据实际情况完善对应的中文翻译逻辑，这里只是示例形式

function getChineseRecipeName(englishName) {
    // 简单示例，实际中需要完整的映射关系，比如可以用对象或者其他数据结构来存储完整对应关系
    const nameMap = {
        "Quinoa Buddha Bowl": "藜麦佛碗",
        "Grilled Chicken Breast": "烤鸡胸肉",
        "Avocado Tuna Bowl": "鳄梨金枪鱼碗",
        "Overnight Oats": "隔夜燕麦",
        "Mediterranean Salad": "地中海沙拉"
    };
    return nameMap[englishName] || englishName;
}

function getChineseTagName(englishTag) {
    const tagMap = {
        "Vegetarian": "素食",
        "High Fiber": "高纤维",
        "Gluten-Free": "无麸质",
        "High Protein": "高蛋白",
        "Low Fat": "低脂",
        "Gym Diet": "健身餐",
        "Keto": "生酮",
        "Low Carb": "低碳水",
        "Seafood": "海鲜",
        "Breakfast": "早餐",
        "Meal Prep": "备餐",
        "Low Calorie": "低热量",
        "Mediterranean": "地中海式"
    };
    return tagMap[englishTag] || englishTag;
}

function getChineseRecipeDescription(englishDescription) {
    const desEng={
        "A nutrient-rich bowl with quinoa, roasted vegetables, and tahini dressing":"一款富含营养的碗，包含藜麦、烤蔬菜和芝麻酱",
        "Lean protein with steamed broccoli and sweet potato" : "精瘦蛋白质配蒸西兰花和红薯",
        "Low-carb bowl with fresh tuna, avocado, and mixed greens" : "低碳水碗，包含新鲜金枪鱼、鳄梨和混合蔬菜",
        "Protein-packed breakfast with oats, chia seeds, and berries" : "高蛋白早餐，包含燕麦、奇亚籽和浆果",
        "Fresh salad with feta, olives, and olive oil dressing" : "新鲜沙拉，配有羊奶酪、橄榄和橄榄油沙拉酱"
    };
    return desEng[englishDescription]||englishDescription;
}

// -------------------------------Navigation item click effect-----------------------------
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});