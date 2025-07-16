
function cardTemplate(data) {
  console.log(data);
  

  const {id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

  const picture = `./assets/images/${image}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.className = "relative bg-white w-[30%] shadow-2xl rounded-lg overflow-hidden";

    const imageContainer = document.createElement("div");
    imageContainer.className = "relative";

    const img = document.createElement("img");
    img.className = "w-full h-64 object-cover";
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const timeSpan = document.createElement("span");
    timeSpan.className = "absolute bg-[color:var(--primary-color)] top-4 right-4 text-black font-bold rounded-xl px-2 py-1 text-sm";
    timeSpan.textContent = `${time}min`;

    const contentContainer = document.createElement("div");
    contentContainer.className = "p-6";

    const title = document.createElement("h3");
    title.className = "text-black text-xl font-bold mb-4";
    title.textContent = name;

    // Recette
    const recipeSection = document.createElement("div");
    recipeSection.className = "mb-4";

    const recipeLabel = document.createElement("p");
    recipeLabel.className = "text-gray-500 font-bold mb-2 text-sm uppercase";
    recipeLabel.textContent = "RECETTE";

    const recipeDescription = document.createElement("p");
    recipeDescription.className = "text-black text-sm";
    recipeDescription.textContent = description;

    // Ingredients
    const ingredientsSection = document.createElement("div");
    ingredientsSection.className = "mt-4";

    const ingredientsLabel = document.createElement("p");
    ingredientsLabel.className = "text-gray-500 font-bold mb-2 text-sm uppercase";
    ingredientsLabel.textContent = "INGRÉDIENTS";

    const ingredientsGrid = document.createElement("div");
    ingredientsGrid.className = "grid grid-cols-2 gap-2 text-sm";

    // Parcourt chaque élément du tableau (ingredients) et stocke chaque élément dans (ingredient)
    ingredients.forEach(ingredient => {
      const ingredientList = document.createElement("div");
      ingredientList.className = "text-black";

      const ingredientName = document.createElement("p");
      ingredientName.className = "font-bold"
      ingredientName.textContent = ingredient.ingredient; // Je veux un seul objet du tableau
      
      const ingredientQuantity = document.createElement("p");
      ingredientQuantity.className = "text-gray-500";
      ingredientQuantity.textContent = ((ingredient.quantity || '') + ' ' + (ingredient.unit || '')).trim();

      ingredientList.appendChild(ingredientName);
      ingredientList.appendChild(ingredientQuantity);
      ingredientsGrid.appendChild(ingredientList);
    });

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

    return article;
  }
  return { getUserCardDOM };
}


