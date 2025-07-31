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
  
  // Première boucle - parcourir chaque recette
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    let recetteTrouvee = false;
    
    // Étape 4 : Deuxième niveau pour vérifier chaque champ manuellement
    
    // Vérifie le titre
    if (contient(recipe.name, motNormalise)) {
      recetteTrouvee = true;
    }
    
    // Vérifie la description
    if (!recetteTrouvee && contient(recipe.description, motNormalise)) {
      recetteTrouvee = true;
    }
    
    // Vérifie les ingrédients (boucle for séparée)
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