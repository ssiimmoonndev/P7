// On crée une copie de la liste originale des recettes pour ne jamais la modifier.
const originalRecipes = [...recipes]; 
// On récupère l'élément de la barre de recherche du DOM.
const searchBar = document.getElementById('search-bar');

const recipeCountElement = document.getElementById('recipe-count');

// Structure de données pour stocker les filtres actifs (tags sélectionnés).
// On utilise des Set pour éviter les doublons et pour une suppression/ajout efficace car un Set est un type d'objet qui ne peut stocker que des valeurs uniques.
let activeFilters = {
  ingredients: new Set(),
  appliances: new Set(),
  ustensils: new Set()
};


// FONCTIONS

function displayRecipe(recipesToDisplay) {
  // Sélectionne le conteneur des cartes de recettes.
  const cardsContainer = document.querySelector('.cards');
  // Vide le conteneur avant d'ajouter les nouvelles cartes.
  cardsContainer.innerHTML = '';
  // Pour chaque recette à afficher, on crée et on ajoute sa carte au DOM.
  recipesToDisplay.forEach(recipe => {
    const recipeCard = cardTemplate(recipe); // Crée le modèle de carte.
    const cardElement = recipeCard.getUserCardDOM(); // Génère l'élément DOM de la carte.
    cardsContainer.appendChild(cardElement); // Ajoute la carte au conteneur.
  });
}

function displayTags() {
  // On récupère le conteneur HTML qui affiche les tags des filtres actifs.
  const tagsContainer = document.getElementById('tags-container');
  // On le vide.
  tagsContainer.innerHTML = '';

  const filterTypes = Object.keys(activeFilters); // Récupère toutes les clés (types de filtres)
  
  for (const type of filterTypes) {
    const filterSet = activeFilters[type]; // Les valeurs pour ce type (ex: ['red', 'blue'])
    
    filterSet.forEach(value => {
      // On crée un nouvel élément <div> qui représentera le tag.
      const tag = document.createElement('div');
      // Classes Tailwind pour lui donner du style.
      tag.className = 'bg-primary px-4 py-2 rounded-lg flex items-center gap-4 cursor-pointer';
      
      // Span pour le nom du tag.
      const tagName = document.createElement('span');
      // On met la première lettre en majuscule.
      tagName.textContent = value.charAt(0).toUpperCase() + value.slice(1);
      
      // Span pour la croix de fermeture.
      const closeBtn = document.createElement('span');
      closeBtn.className = 'font-bold text-lg';
      // Représente le symbole de multiplication.
      closeBtn.innerHTML = '&times;';
      
      tag.appendChild(tagName);
      tag.appendChild(closeBtn);

      // Au click, on appelle la fonction 'removeFilter' avec le bon type et la bonne value pour à supprimer.
      tag.onclick = () => removeFilter(type, value);

      tagsContainer.appendChild(tag);
    });
  }
}

// Met à jour le texte du compteur de recettes.
function updateRecipeCount(count) {
  // Si count > 1, on affiche "recettes". Sinon, on affiche "recette".
  recipeCountElement.textContent = count > 1 ? `${count} recettes` : `${count} recette`;
}


function addFilter(type, value) {
  activeFilters[type].add(value.toLowerCase()); // Ajoute la valeur (en minuscules) au Set correspondant.
  applyAllFilters(); // Relance l'application de tous les filtres.
}


function removeFilter(type, value) {
  activeFilters[type].delete(value.toLowerCase()); // Supprime la valeur du Set correspondant.
  applyAllFilters(); // Relance l'application de tous les filtres.
}


function applyAllFilters() {
  // Récupère la valeur actuelle de la barre de recherche.
  const searchTerm = searchBar.value;
  // Commence avec une copie complète de toutes les recettes originales.
  let filteredRecipes = [...originalRecipes];
  
  // 1. Filtrage par la barre de recherche principale.
  filteredRecipes = searchRecipes(searchTerm, filteredRecipes);

  // 2. Filtrage par les tags d'ingrédients actifs.
  if (activeFilters.ingredients.size > 0) { // On filtre seulement si il y a au moins un filtre d'ingrédient actif.
    filteredRecipes = filteredRecipes.filter(recipe => 
      // Convertit le Set en Array.
      // .every() : la recette doit contenir TOUS les ingrédients sélectionnés.
      Array.from(activeFilters.ingredients).every(selectedIng =>
        // .some() : on cherche si au moins un ingrédient de la recette correspond à l'ingrédient sélectionné.
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === selectedIng)
      )
    );
  }
  // 3. Filtrage par les tags d'appareils actifs.
  if (activeFilters.appliances.size > 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      Array.from(activeFilters.appliances).every(selectedApp =>
        recipe.appliance.toLowerCase() === selectedApp
      )
    );
  }
  // 4. Filtrage par les tags d'ustensiles actifs.
  if (activeFilters.ustensils.size > 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      Array.from(activeFilters.ustensils).every(selectedUst =>
        recipe.ustensils.some(ust => ust.toLowerCase() === selectedUst)
      )
    );
  }

  // MISE À JOUR DE L'INTERFACE UTILISATEUR
  displayRecipe(filteredRecipes); // Affiche les recettes finalement filtrées.
  populateDropdowns(filteredRecipes, activeFilters); // Met à jour le contenu des listes déroulantes.
  displayTags(); // Affiche les tags des filtres actuellement actifs.
  updateRecipeCount(filteredRecipes.length); // Met à jour le compteur avec le nombre de recettes trouvées.
}


// EVENT LISTENERS

// Déclenche le filtrage à chaque saisie dans la barre de recherche.
searchBar.addEventListener('input', applyAllFilters);

// Gère les clics sur les listes des filtres (ingrédients, appareils, ustensiles).
document.querySelectorAll('.dropdown-list').forEach(list => {
  list.addEventListener('click', (e) => {
    // Utilise la délégation d'événement pour cibler l'élément `li` cliqué.
    const li = e.target.closest('li');
    if (!li) return; // Si le clic n'est pas sur un `li`, on ne fait rien.

    // Récupère la valeur et le type du filtre depuis les attributs data-* de l'élément.
    const value = li.dataset.value;
    const type = li.dataset.type;
    if (!type || !value) return; // Sécurité si les attributs manquent, on ne fait rien.

    // Logique de TOGGLE : si le filtre est déjà actif,
    if (activeFilters[type].has(value)) {
      // On le retire,
      removeFilter(type, value);
    } else {
      // Sinon, on l'ajoute.
      addFilter(type, value);
    }
  });
});


function init() {
  // Affiche toutes les recettes au chargement.
  displayRecipe(originalRecipes);
  // Remplit les listes déroulantes avec toutes les options possibles au début.
  populateDropdowns(originalRecipes, activeFilters);

  displayTags(); // NOUVEAU : On affiche le conteneur de tags (vide au début).
  updateRecipeCount(originalRecipes.length); // NOUVEAU : On initialise le compteur avec le total.
}

init();