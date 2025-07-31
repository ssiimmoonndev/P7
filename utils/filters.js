// Recherche via INGREDIENT, USTENSIL, APPLICANCE
// Utilisation de some() car je veux savoir "est-ce qu'au moins un ingrédient contient le terme ?" et tu peux t'arrêter dès que tu en trouves un !


function contient(texte, mot) {
  const texteEnMinuscules = texte.toLowerCase();
  const motEnMinuscules = mot.toLowerCase();
  return texteEnMinuscules.includes(motEnMinuscules);
}

function searchRecipes(mot, recipes) {
  if (mot.length < 3) {
    return recipes;
  }
  
  // Je filtre les recettes
  const recettesCorrespondantes = recipes.filter(function(recipe) {
    
    // Étape 1 : je vérifie le nom
    const nomCorrespond = contient(recipe.name, mot);
    
    // Étape 2 : je vérifie la description  
    const descriptionCorrespond = contient(recipe.description, mot);
    
    // Étape 3 : je vérifie les ingrédients avec some()
    const ingredientCorrespond = recipe.ingredients.some(function(item) {
      // Pour chaque ingrédient, je vérifie s'il contient le mot
      return contient(item.ingredient, mot);
    });

    // Étape 4 : je vérifie les ustensiles avec some()
    const ustensilCorrespond = recipe.ustensils.some(function(ustensil) {
      return contient(ustensil, mot);
    });
    
    // Étape 5 : je vérifie l'appareil
    const applianceCorrespond = contient(recipe.appliance, mot);
    
    // Retourn true si une des 3 conditions est vraie
    return nomCorrespond || descriptionCorrespond || ingredientCorrespond || ustensilCorrespond || applianceCorrespond;
  });
  
  return recettesCorrespondantes;
}