
function createListItem(item, type, isSelected) {
  // Crée un nouvel élément de liste <li>.
  const li = document.createElement('li');
  // Met la première lettre en majuscule.
  const content = item.charAt(0).toUpperCase() + item.slice(1);
  // Stocke le type de filtre dans un attribut data-* pour une récupération facile au clic.
  li.dataset.type = type; 
  // Stocke la valeur brute (en minuscules) pour les comparaisons et la logique de filtrage.
  li.dataset.value = item; 

  if (isSelected) {
    // Si l'élément est sélectionné, on lui donne un fond de couleur et une icône pour le supprimer.
    li.className = "p-2 bg-primary font-bold flex justify-between items-center cursor-pointer";
    li.innerHTML = `<span>${content}</span><span class="text-black text-xl">&times;</span>`;
  } else {
    // Sinon, c'est un élément standard avec un effet au survol.
    li.className = "p-2 hover:bg-primary cursor-pointer";
    li.textContent = content;
  }
  return li;
}

function renderList(listElement, allItems, selectedItems, type) {
  listElement.innerHTML = ''; // On vide la liste pour la reconstruire.

  // Sépare les items non sélectionnés des items déjà sélectionnés.
  // La méthode .has() vérifie si un élément existe et retourne true ou false.
  const unselected = Array.from(allItems).filter(item => !selectedItems.has(item));
  const selected = Array.from(selectedItems);
  
  // Trie les deux listes par ordre alphabétique pour un affichage cohérent.
  selected.sort();
  unselected.sort();

  // Affiche d'abord les items sélectionnés en haut de la liste.
  selected.forEach(item => listElement.appendChild(createListItem(item, type, true)));
  // Puis affiche les items non sélectionnés à la suite.
  unselected.forEach(item => listElement.appendChild(createListItem(item, type, false)));
}


function populateDropdowns(recipes, activeFilters) {
  // Sélectionne les éléments <ul> de chaque menu déroulant.
  const ingredientsList = document.querySelector('.dropdown-container:nth-child(1) .dropdown-list');
  const appliancesList = document.querySelector('.dropdown-container:nth-child(2) .dropdown-list');
  const ustensilsList = document.querySelector('.dropdown-container:nth-child(3) .dropdown-list');

  // Crée des Sets pour stocker les options uniques et éviter les doublons.
  const allIngredients = new Set();
  const allAppliances = new Set();
  const allUstensils = new Set();

  // On collecte toutes les options possibles à partir des recettes actuellement visibles.
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(item => allIngredients.add(item.ingredient.toLowerCase()));
    allAppliances.add(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach(ustensil => allUstensils.add(ustensil.toLowerCase()));
  });

  // On utilise notre fonction pour afficher chaque liste.
  renderList(ingredientsList, allIngredients, activeFilters.ingredients, 'ingredients');
  renderList(appliancesList, allAppliances, activeFilters.appliances, 'appliances');
  renderList(ustensilsList, allUstensils, activeFilters.ustensils, 'ustensils');
}


function initializeDropdowns() {
  // Applique cette logique à chaque conteneur de menu déroulant.
  document.querySelectorAll('.dropdown-container').forEach(container => {
    const button = container.querySelector('.dropdown-btn');
    const chevron = container.querySelector('.dropdown-chevron');
    const content = container.querySelector('.dropdown-content');
    const searchInput = container.querySelector('.dropdown-search');
    const list = container.querySelector('.dropdown-list');

    // Gère le clic sur le bouton pour afficher/cacher le contenu du menu.
    chevron.addEventListener('click', () => {
      content.classList.toggle('hidden');
      button.classList.toggle('open');
    });

    // Gère la saisie dans le champ de recherche interne au menu.
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const items = list.querySelectorAll('li');
      // Affiche ou cache les éléments de la liste en fonction du terme de recherche.
      items.forEach(item => {
        const text = item.dataset.value; // On cherche sur la valeur brute stockée.
        item.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    });
  });
}

initializeDropdowns();