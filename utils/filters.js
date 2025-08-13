// Je filtre les ingredients, appareils et ustensils
const tagsCorrespondants = recipes.filter(function(recipe) {
    
  // Étape 1 : je vérifie le nom
  const ingredientCorrespond = contient(recipe.ingredient, mot);
  
  // Étape 2 : je vérifie la description  
  const appareilCorrespond = contient(recipe.appliance, mot);
  
  // Étape 3 : je vérifie les ingrédients avec some()
  const ustensilCorrespond = contient(recipe.ustensils, mot);

  // Cette ligne va nous montrer dans la console si une recette correspond ou non.
  if (nomCorrespond || descriptionCorrespond || ingredientCorrespond) {
    console.log(`TROUVÉ '${mot}' dans la recette :`, recipe.name);
  }
 
  
  // Retourn true si une des 3 conditions est vraie
  return ustensilCorrespond || appareilCorrespond || ingredientCorrespond;
});