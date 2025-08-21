function cardTemplate(data) {
  
  // On déstructure l'objet 'data' pour accéder facilement à ses propriétés.
  const {id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

  // Construit le chemin complet de l'image de la recette.
  const picture = `./assets/images/${image}`;


  function getUserCardDOM() {
    // Crée l'élément principal de la carte.
    const article = document.createElement("article");
    article.className = "relative bg-white w-[30%] shadow-2xl rounded-lg overflow-hidden";

    // Crée le conteneur pour l'image et le badge de temps.
    const imageContainer = document.createElement("div");
    imageContainer.className = "relative";

    // Crée l'élément image.
    const img = document.createElement("img");
    img.className = "w-full h-64 object-cover";
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    // Crée le badge pour afficher le temps de préparation.
    const timeSpan = document.createElement("span");
    timeSpan.className = "absolute bg-primary top-4 right-4 text-black font-bold rounded-xl px-2 py-1 text-sm";
    timeSpan.textContent = `${time}min`;

    // Crée le conteneur pour le contenu textuel (titre, recette, ingrédients).
    const contentContainer = document.createElement("div");
    contentContainer.className = "p-6";

    // Crée le titre de la recette.
    const title = document.createElement("h3");
    title.className = "text-black text-xl font-bold mb-4";
    title.textContent = name;

    // Section "RECETTE"
    const recipeSection = document.createElement("div");
    recipeSection.className = "mb-4";

    const recipeLabel = document.createElement("p");
    recipeLabel.className = "text-gray-500 font-bold mb-2 text-sm uppercase";
    recipeLabel.textContent = "RECETTE";

    const recipeDescription = document.createElement("p");
    recipeDescription.className = "text-black text-sm";
    recipeDescription.textContent = description; // Affiche la description de la recette.

    // Section "INGRÉDIENTS"
    const ingredientsSection = document.createElement("div");
    ingredientsSection.className = "mt-4";

    const ingredientsLabel = document.createElement("p");
    ingredientsLabel.className = "text-gray-500 font-bold mb-2 text-sm uppercase";
    ingredientsLabel.textContent = "INGRÉDIENTS";

    // Crée une grille pour afficher les ingrédients sur deux colonnes.
    const ingredientsGrid = document.createElement("div");
    ingredientsGrid.className = "grid grid-cols-2 gap-2 text-sm";

    // Boucle sur chaque ingrédient de la recette pour l'ajouter à la grille.
    ingredients.forEach(ingredient => {
      const ingredientList = document.createElement("div");
      ingredientList.className = "text-black";

      // Affiche le nom de l'ingrédient.
      const ingredientName = document.createElement("p");
      ingredientName.className = "font-bold";
      ingredientName.textContent = ingredient.ingredient;
      
      // Affiche la quantité et l'unité (s'ils existent).
      const ingredientQuantity = document.createElement("p");
      ingredientQuantity.className = "text-gray-500";
      ingredientQuantity.textContent = ((ingredient.quantity || '') + ' ' + (ingredient.unit || '')).trim();

      // Ajoute le nom et la quantité à l'élément de l'ingrédient.
      ingredientList.appendChild(ingredientName);
      ingredientList.appendChild(ingredientQuantity);
      // Ajoute l'ingrédient complet à la grille.
      ingredientsGrid.appendChild(ingredientList);
    });

    // Assemble tous les éléments créés pour former la carte.
    imageContainer.appendChild(img);
    imageContainer.appendChild(timeSpan);
    recipeSection.appendChild(recipeLabel);
    recipeSection.appendChild(recipeDescription);
    ingredientsSection.appendChild(ingredientsLabel);
    ingredientsSection.appendChild(ingredientsGrid);
    contentContainer.appendChild(title);
    contentContainer.appendChild(recipeSection);
    contentContainer.appendChild(ingredientsSection);
    article.appendChild(imageContainer);
    article.appendChild(contentContainer);

    // Retourne la carte complète.
    return article;
  }
  
  return { getUserCardDOM };
}