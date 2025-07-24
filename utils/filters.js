const allRecipes = [];

const ingredientsSelect = document.getElementById('ingredients-filter');
const appareilsSelect = document.getElementById('appliance-filter');
const ustensilsSelect = document.getElementById('ustensils-filter');
const recipesSection = document.querySelector('.recipes-section');

// Variables pour stocker  les filtres actifs
let activeFilters = {
  ingredients: '',
  appareils: '',
  ustensils: '',
};
