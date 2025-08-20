// Fichier: index.js (Version finale et épurée)

// --- VARIABLES GLOBALES ET ÉTAT ---
const originalRecipes = [...recipes];
const searchBar = document.getElementById('search-bar');

let activeFilters = {
  ingredients: new Set(),
  appliances: new Set(),
  ustensils: new Set()
};


// --- FONCTIONS ---

function displayRecipe(recipesToDisplay) {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = '';
  recipesToDisplay.forEach(recipe => {
    const recipeCard = cardTemplate(recipe);
    const cardElement = recipeCard.getUserCardDOM();
    cardsContainer.appendChild(cardElement);
  });
}

function addFilter(type, value) {
  activeFilters[type].add(value.toLowerCase());
  applyAllFilters();
}

function removeFilter(type, value) {
  activeFilters[type].delete(value.toLowerCase());
  applyAllFilters();
}

function applyAllFilters() {
  const searchTerm = searchBar.value;
  let filteredRecipes = [...originalRecipes];
  
  // Filtrage par barre de recherche
  filteredRecipes = searchRecipes(searchTerm, filteredRecipes);

  // Filtrage par les filtres actifs (tags internes)
  if (activeFilters.ingredients.size > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      Array.from(activeFilters.ingredients).every(selectedIng =>
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === selectedIng)
      )
    );
  }
  if (activeFilters.appliances.size > 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      Array.from(activeFilters.appliances).every(selectedApp =>
        recipe.appliance.toLowerCase() === selectedApp
      )
    );
  }
  if (activeFilters.ustensils.size > 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      Array.from(activeFilters.ustensils).every(selectedUst =>
        recipe.ustensils.some(ust => ust.toLowerCase() === selectedUst)
      )
    );
  }

  // MISE À JOUR DE L'INTERFACE
  displayRecipe(filteredRecipes);
  populateDropdowns(filteredRecipes, activeFilters); // Met à jour les listes internes
}


// --- ÉCOUTEURS D'ÉVÉNEMENTS ---

searchBar.addEventListener('input', applyAllFilters);

document.querySelectorAll('.dropdown-list').forEach(list => {
  list.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const value = li.dataset.value;
    const type = li.dataset.type;
    if (!type || !value) return;

    // Logique de TOGGLE
    if (activeFilters[type].has(value)) {
      removeFilter(type, value);
    } else {
      addFilter(type, value);
    }
  });
});


// --- INITIALISATION ---

function init() {
  displayRecipe(originalRecipes);
  populateDropdowns(originalRecipes, activeFilters);
}

init();