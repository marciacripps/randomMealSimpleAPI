document.addEventListener('DOMContentLoaded', function() {
  let getMealButton = document.getElementById('get-meal-btn');
  let mealName = document.getElementById('meal-name');
  let mealImage = document.getElementById('meal-image');
  let mealInstructions = document.getElementById('meal-instructions');
  const ingredientsList = document.getElementById('ingredients-list');

  getMealButton.addEventListener('click', function() {
      try {
          fetch('https://www.themealdb.com/api/json/v1/1/random.php')
              .then(function(response) {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then(function(data) {
                  let meal = data.meals[0];
                  mealName.textContent = meal.strMeal;
                  mealImage.src = meal.strMealThumb;
                  mealImage.alt = 'Image of ' + meal.strMeal;
                  mealInstructions.innerHTML = '<h3>Instructions</h3><p>' + meal.strInstructions + '</p>';
                  
                  // Clear the previous ingredients
                  ingredientsList.innerHTML = '';
                  
                  // Add ingredients and measures to the list
                  for(let i = 1; i <= 20; i++) {
                      let ingredient = meal['strIngredient' + i];
                      let measure = meal['strMeasure' + i];
                      // Check if the ingredient exists and is not just an empty string
                      if(ingredient && ingredient.trim() !== '') {
                          // Create a list item and add it to the ingredients list
                          let listItem = document.createElement('li');
                          listItem.textContent = `${ingredient} - ${measure}`;
                          ingredientsList.appendChild(listItem);
                      }
                  }
              })
              .catch(function(error) {
                  console.error('Error fetching meal:', error);
              });
      } catch (error) {
          console.error('Error fetching meal:', error);
      }
  });
});
