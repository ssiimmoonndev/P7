// Fichier: index.js

// --- VARIABLES GLOBALES ET ÉTAT DE L'APPLICATION ---

// Copie non modifiable de toutes les recettes
const originalRecipes = [...recipes];
// Barre de recherche principale
const searchBar = document.getElementById('search-bar');

// L'état central de notre application : contient les filtres actuellement sélectionnés.
// On utilise des Sets pour gérer facilement l'ajout/suppression et éviter les doublons.
let activeFilters = {
  ingredients: new Set(),
  appliances: new Set(),
  ustensils: new Set()
};


// --- FONCTIONS D'AFFICHAGE (MISES À JOUR DE L'INTERFACE) ---

/**
 * Affiche les recettes dans le DOM.
 * @param {Array} recipesToDisplay - Le tableau de recettes à afficher.
 */
function displayRecipe(recipesToDisplay) {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = '';
  recipesToDisplay.forEach(recipe => {
    const recipeCard = cardTemplate(recipe);
    const cardElement = recipeCard.getUserCardDOM();
    cardsContainer.appendChild(cardElement);
  });
}

/**
 * Affiche les tags des filtres actifs.
 */
function displayTags() {
  const tagsContainer = document.getElementById('tags-container');
  tagsContainer.innerHTML = '';

  // Parcourt chaque catégorie de filtre (ingredients, appliances, ustensils)
  for (const [type, filterSet] of Object.entries(activeFilters)) {
    // Parcourt chaque filtre actif dans la catégorie
    filterSet.forEach(value => {
      const tag = document.createElement('div');
      tag.className = 'bg-[color:var(--primary-color)] px-4 py-2 rounded-lg flex items-center gap-4';
      
      const tagName = document.createElement('span');
      // Met la première lettre en majuscule pour l'affichage
      tagName.textContent = value.charAt(0).toUpperCase() + value.slice(1);
      
      const closeBtn = document.createElement('button');
      closeBtn.className = 'font-bold text-lg';
      closeBtn.innerHTML = '&times;'; // Symbole "x"
      // Au clic, on appelle la fonction pour supprimer le filtre
      closeBtn.onclick = () => removeFilter(type, value);

      tag.appendChild(tagName);
      tag.appendChild(closeBtn);
      tagsContainer.appendChild(tag);
    });
  }
}


// --- FONCTIONS DE LOGIQUE (GESTION DE L'ÉTAT) ---

/**
 * Ajoute un filtre à l'état `activeFilters` et relance le filtrage.
 * @param {string} type - Le type de filtre (e.g., 'ingredients').
 * @param {string} value - La valeur du filtre (e.g., 'lait de coco').
 */
function addFilter(type, value) {
  const lowerCaseValue = value.toLowerCase();
  activeFilters[type].add(lowerCaseValue);
  applyAllFilters(); // On relance une mise à jour complète
}

/**
 * Supprime un filtre de l'état `activeFilters` et relance le filtrage.
 * @param {string} type - Le type de filtre.
 * @param {string} value - La valeur du filtre.
 */
function removeFilter(type, value) {
  const lowerCaseValue = value.toLowerCase();
  activeFilters[type].delete(lowerCaseValue);
  applyAllFilters(); // On relance une mise à jour complète
}

/**
 * La fonction principale qui filtre les recettes en fonction de la recherche ET des tags.
 */
function applyAllFilters() {
  const searchTerm = searchBar.value;
  
  // 1. On part toujours de la liste originale complète
  let filteredRecipes = [...originalRecipes];
  
  // 2. On applique d'abord le filtre de la barre de recherche principale
  filteredRecipes = searchRecipes(searchTerm, filteredRecipes);

  // 3. Ensuite, on applique les filtres des tags actifs (de manière cumulative)
  if (activeFilters.ingredients.size > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => 
      // La recette doit contenir TOUS (every) les ingrédients sélectionnés
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

  // 4. On met à jour toutes les parties de l'interface
  displayRecipe(filteredRecipes);
  displayTags();
  populateDropdowns(filteredRecipes, activeFilters);
}


// --- ÉCOUTEURS D'ÉVÉNEMENTS ---

// Écouteur pour la barre de recherche principale
searchBar.addEventListener('input', applyAllFilters);

// Écouteur pour les clics sur les options dans les listes déroulantes
document.querySelectorAll('.dropdown-list').forEach(list => {
  list.addEventListener('click', (e) => {
    // On s'assure qu'on a bien cliqué sur un élément LI
    if (e.target.tagName === 'LI') {
      const value = e.target.textContent;
      const type = e.target.dataset.type; // On récupère le type stocké dans data-type
      if (type && value) {
        addFilter(type, value);
        // On pourrait aussi fermer le dropdown ici si on le souhaite
        e.target.closest('.dropdown-content').classList.add('hidden');
      }
    }
  });
});


// --- INITIALISATION DE L'APPLICATION ---

/**
 * Fonction qui initialise l'application au chargement de la page.
 */
function init() {
  displayRecipe(originalRecipes);
  populateDropdowns(originalRecipes, activeFilters);
}

// Lancement !
init();