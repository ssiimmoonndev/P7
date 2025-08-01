
function displayRecipe(data) {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = ''; 
  // Parcourt chaque élément du tableau (recipes) et stocke chaque élément dans (recipe)
  data.forEach(recipe => {
    // Création carte - cardTemplate contient la data des recettes
    const recipeCard = cardTemplate(recipe);
    // Méthode dans laquelle j'ai déjà créé les éléments de mon HTML pour les cartes
    const cardElement = recipeCard.getUserCardDOM();

    cardsContainer.appendChild(cardElement);
  });
}

// cardTemplate("");

// Fonction init
function initRecipeCards() {
  // Si le nombre d'élément dans le tableau (recipes) est supérieur à zéro, la condition est vraie
  if (recipes.length > 0) {
    // Appelle la fonction (displayRecette) avec (recipes) en paramètre
    displayRecipe(recipes);
    
  }
}

initRecipeCards();



// 1. Sélectionner la barre de recherche
const searchBar = document.getElementById('search-bar');

// 2. Ajouter un écouteur d'événement sur la barre de recherche
searchBar.addEventListener('input', (e) => {
  // Récupérer le texte tapé par l'utilisateur
  const searchTerm = e.target.value;

  // 3. Filtrer les recettes en utilisant votre fonction
  const filteredRecipes = searchRecipes(searchTerm, recipes);

  // 4. Afficher les nouvelles recettes filtrées (votre fonction displayRecipe s'occupe de l'affichage)
  displayRecipe(filteredRecipes);
});