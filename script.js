const apiKey = '7a02e4271ff14b6aa41025140833951d'; // Replace with your Spoonacular API key

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

document.getElementById('mealPlanForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get user inputs
  const calories = document.getElementById('calories').value;
  const diet = document.getElementById('diet').value;

  // Validate inputs
  if (!calories || !diet) {
    alert('Please fill in all fields.');
    return;
  }

  // Generate meal plan using Spoonacular API
  generateMealPlan(calories, diet);
});

function generateMealPlan(calories, diet) {
  const url = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${calories}&diet=${diet}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Check the API response in the console
      displayMealPlan(data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to fetch meal plan. Please try again later.');
    });
}

function displayMealPlan(mealPlan) {
  const mealPlanDiv = document.getElementById('mealPlan');
  mealPlanDiv.innerHTML = '';

  if (mealPlan.meals && mealPlan.meals.length > 0) {
    mealPlan.meals.forEach(meal => {
      mealPlanDiv.innerHTML += `
        <div class="meal">
          <h3>${meal.title}</h3>
          <p>Ready in ${meal.readyInMinutes} minutes</p>
          <p>Servings: ${meal.servings}</p>
          <a href="${meal.sourceUrl}" target="_blank">View Recipe</a>
        </div>
      `;
    });
  } else {
    mealPlanDiv.innerHTML = '<p>No meals found. Please adjust your inputs.</p>';
  }
}