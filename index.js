
function displayRecipe(data) {
  const cardsContainer = document.querySelector('.cards');
  // Parcourt chaque élément du tableau (recipes) et stocke chaque élément dans (recipe)
  data.forEach(recipe => {
    // Création carte - cardTemplate contient la data des recettes
    const recipeCard = cardTemplate(recipe);
    // Méthode dans laquelle j'ai déjà créé les éléments de mon HTML pour les cartes
    const cardElement = recipeCard.getUserCardDOM();

    cardsContainer.appendChild(cardElement);
  });
}

cardTemplate("");

// Fonction init
function initRecipeCards() {
  // Si le nombre d'élément dans le tableau (recipes) est supérieur à zéro, la condition est vraie
  if (recipes.length > 0) {
    // Appelle la fonction (displayRecette) avec (recipes) en paramètre
    displayRecipe(recipes);
    
  }
}

initRecipeCards();

// Initialisez les filtres lorsque la page est prête
initFilters(recipes);