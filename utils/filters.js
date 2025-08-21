// Fichier: utils/filters.js

/**
 * Crée un élément <li> pour une liste déroulante avec le style approprié.
 * @param {string} item - Le texte de l'élément.
 * @param {string} type - Le type de filtre ('ingredients', etc.).
 * @param {boolean} isSelected - Si l'élément est actuellement sélectionné.
 * @returns {HTMLElement} L'élément <li> créé.
 */
function createListItem(item, type, isSelected) {
  const li = document.createElement('li');
  const content = item.charAt(0).toUpperCase() + item.slice(1);
  li.dataset.type = type; // On stocke le type pour la logique de clic
  li.dataset.value = item; // On stocke la valeur en minuscules pour la comparaison

  if (isSelected) {
    li.className = "p-2 bg-primary font-bold flex justify-between items-center cursor-pointer";
    // Si l'élément est sélectionné, on ajoute le texte et une icône de croix
    li.innerHTML = `<span>${content}</span><span class="text-black text-xl">&times;</span>`;
  } else {
    li.className = "p-2 hover:bg-primary cursor-pointer";
    li.textContent = content;
  }
  return li;
}

/**
 * Sépare les items, les trie, et les affiche dans la liste (items sélectionnés en premier).
 * @param {HTMLElement} listElement - L'élément <ul> à remplir.
 * @param {Set} allItems - Un Set de tous les items possibles pour cette liste.
 * @param {Set} selectedItems - Un Set des items actuellement sélectionnés.
 * @param {string} type - Le type de filtre.
 */
function renderList(listElement, allItems, selectedItems, type) {
  listElement.innerHTML = ''; // On vide la liste

  const unselected = Array.from(allItems).filter(item => !selectedItems.has(item));
  const selected = Array.from(selectedItems);
  
  // On trie les deux listes par ordre alphabétique pour un affichage cohérent
  selected.sort();
  unselected.sort();

  // On affiche d'abord les items sélectionnés
  selected.forEach(item => listElement.appendChild(createListItem(item, type, true)));
  // Puis les items non sélectionnés
  unselected.forEach(item => listElement.appendChild(createListItem(item, type, false)));
}


/**
 * Remplit toutes les listes déroulantes en fonction des recettes et des filtres actifs.
 * @param {Array} recipes - Les recettes à utiliser pour générer les options.
 * @param {Object} activeFilters - L'objet contenant les filtres actifs.
 */
function populateDropdowns(recipes, activeFilters) {
  const ingredientsList = document.querySelector('.dropdown-container:nth-child(1) .dropdown-list');
  const appliancesList = document.querySelector('.dropdown-container:nth-child(2) .dropdown-list');
  const ustensilsList = document.querySelector('.dropdown-container:nth-child(3) .dropdown-list');

  const allIngredients = new Set();
  const allAppliances = new Set();
  const allUstensils = new Set();

  // On collecte toutes les options possibles à partir des recettes affichées
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(item => allIngredients.add(item.ingredient.toLowerCase()));
    allAppliances.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach(ustensil => allUstensils.add(ustensil.toLowerCase()));
  });

  // On utilise notre nouvelle fonction pour afficher chaque liste
  renderList(ingredientsList, allIngredients, activeFilters.ingredients, 'ingredients');
  renderList(appliancesList, allAppliances, activeFilters.appliances, 'appliances');
  renderList(ustensilsList, allUstensils, activeFilters.ustensils, 'ustensils');
}


// Cette partie ne change pas
function initializeDropdowns() {
  document.querySelectorAll('.dropdown-container').forEach(container => {
    const button = container.querySelector('.dropdown-btn');
    const content = container.querySelector('.dropdown-content');
    const searchInput = container.querySelector('.dropdown-search');
    const list = container.querySelector('.dropdown-list');
    const chevron = button.querySelector('img');

    button.addEventListener('click', (e) => {
      content.classList.toggle('hidden');
      button.classList.toggle('open');
    });

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        const text = item.dataset.value; // On cherche sur la valeur brute
        item.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    });
  });
}

initializeDropdowns();