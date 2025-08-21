
function contient(texte, mot) {
  // Convertit le texte et le mot en minuscules pour une recherche insensible à la casse.
  const texteEnMinuscules = texte.toLowerCase();
  const motEnMinuscules = mot.toLowerCase();
  // Retourne vrai si le texte inclut le mot.
  return texteEnMinuscules.includes(motEnMinuscules);
}


function searchRecipes(mot, recipes) {
  // Si le mot recherché a moins de 3 caractères, on ne filtre rien et on retourne toutes les recettes.
  if (mot.length < 3) {
    return recipes;
  }
  
  // On filtre le tableau de recettes. Pour chaque recette, on exécute la fonction suivante.
  const recettesCorrespondantes = recipes.filter(function(recipe) {
    
    // Étape 1 : je vérifie si le nom de la recette contient le mot.
    const nomCorrespond = contient(recipe.name, mot);
    
    // Étape 2 : je vérifie si la description contient le mot.
    const descriptionCorrespond = contient(recipe.description, mot);
    
    // Étape 3 : je vérifie si au moins un des ingrédients contient le mot.
    // .some() s'arrête dès qu'il trouve une correspondance.
    const ingredientCorrespond = recipe.ingredients.some(function(item) {
      // Pour chaque ingrédient, on vérifie s'il contient le mot.
      return contient(item.ingredient, mot);
    });

    if (nomCorrespond || descriptionCorrespond || ingredientCorrespond) {
    }
   
    
    // La recette est conservée si le mot est trouvé dans le nom OU la description OU au moins un ingrédient.
    return nomCorrespond || descriptionCorrespond || ingredientCorrespond;
  });
  
  return recettesCorrespondantes;
}