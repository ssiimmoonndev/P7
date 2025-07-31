// Fonction qui vérifie si un mot se trouve dans un texte
function contient(texte, mot) {
  // Transforme le tout en minuscules
  return texte.toLowerCase().includes(mot.toLowerCase());
}

function searchRecipes(mot, recipes) {
  if (mot.length < 3) {
    return [];
  }
  
  // Normalise le texte en minuscules pour le rendre insensible à la casse
  const motNormalise = mot.toLowerCase();
  
  // Nouveau tableau vide pour les recherches correspondantes
  const recettesCorrespondantes = [];
  
  // Chaque recette
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let recetteTrouvee = false;
    
    // Titre
    if (contient(recipe.name, motNormalise)) {
      recetteTrouvee = true;
    }

    // Description
    if (!recetteTrouvee && contient(recipe.description, motNormalise)) {
      recetteTrouvee = true;
    }
    
    // Ingrédients (boucle for séparée)
    if (!recetteTrouvee) {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        if (contient(recipe.ingredients[j].ingredient, motNormalise)) {
          recetteTrouvee = true;
          break;
        }
      }
    }
    
    if (recetteTrouvee) {
      recettesCorrespondantes.push(recipe);
    }
  }
  
  return recettesCorrespondantes;
}