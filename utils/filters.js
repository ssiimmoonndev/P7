// Fichier: utils/filters.js

/**
 * Remplit les listes déroulantes avec les options disponibles à partir des recettes filtrées.
 * @param {Array} recipes - Le tableau des recettes à utiliser pour peupler les listes.
 * @param {Object} activeFilters - L'objet contenant les filtres déjà actifs.
 */
function populateDropdowns(recipes, activeFilters) {
  const ingredientsList = document.querySelector('.dropdown-container:nth-child(1) .dropdown-list');
  const appliancesList = document.querySelector('.dropdown-container:nth-child(2) .dropdown-list');
  const ustensilsList = document.querySelector('.dropdown-container:nth-child(3) .dropdown-list');

  // Vider les listes pour les reconstruire
  ingredientsList.innerHTML = '';
  appliancesList.innerHTML = '';
  ustensilsList.innerHTML = '';

  const allIngredients = new Set();
  const allAppliances = new Set();
  const allUstensils = new Set();

  recipes.forEach(recipe => {
    // Ingrédients
    recipe.ingredients.forEach(item => {
      const ingredientLower = item.ingredient.toLowerCase();
      // On ajoute l'ingrédient seulement s'il n'est pas déjà un tag actif
      if (!activeFilters.ingredients.has(ingredientLower)) {
        allIngredients.add(ingredientLower);
      }
    });

    // Appareils
    const applianceLower = recipe.appliance.toLowerCase();
    if (!activeFilters.appliances.has(applianceLower)) {
      allAppliances.add(applianceLower);
    }
    
    // Ustensiles
    recipe.ustensils.forEach(ustensil => {
      const ustensilLower = ustensil.toLowerCase();
      if (!activeFilters.ustensils.has(ustensilLower)) {
        allUstensils.add(ustensilLower);
      }
    });
  });

  // Fonction pour créer un élément <li> pour les listes
  const createListItem = (item, type) => {
    const li = document.createElement('li');
    li.textContent = item.charAt(0).toUpperCase() + item.slice(1);
    li.dataset.type = type; // On stocke le type de filtre (important pour la logique de clic)
    li.className = "p-2 hover:bg-[color:var(--primary-color)] cursor-pointer";
    return li;
  };

  // On remplit les <ul> avec les éléments créés
  allIngredients.forEach(ing => ingredientsList.appendChild(createListItem(ing, 'ingredients')));
  allAppliances.forEach(app => appliancesList.appendChild(createListItem(app, 'appliances')));
  allUstensils.forEach(ust => ustensilsList.appendChild(createListItem(ust, 'ustensils')));
}


/**
 * Initialise les écouteurs d'événements pour les 3 listes déroulantes (ouverture/fermeture et recherche interne).
 */
function initializeDropdowns() {
  document.querySelectorAll('.dropdown-container').forEach(container => {
    const button = container.querySelector('.dropdown-btn');
    const content = container.querySelector('.dropdown-content');
    const searchInput = container.querySelector('.dropdown-search');
    const list = container.querySelector('.dropdown-list');

    // Gère l'ouverture et la fermeture
    button.addEventListener('click', () => {
      content.classList.toggle('hidden');
    });

    // Gère la recherche à l'intérieur de la liste déroulante
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        // Affiche ou cache l'élément de la liste en fonction de la correspondance
        if (text.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Lancer l'initialisation des dropdowns
initializeDropdowns();