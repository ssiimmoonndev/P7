function cardTemplate(data) {

  const {id, image, name, servings, ingredients, time, description, appliance, ustensils } = data;

  const piture = `./assets/images/${image}`;

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
    const recetteSection = document.createElement("div");
    recetteSection.className = "mb-4";

    const recetteLabel = document.createElement("p");
    recetteLabel.className = "text-gray-500 font-bold mb-2 text-sm uppercase";
    recetteLabel.textContent = "RECETTE";

    const recetteDescription = document.createElement("p");
    recetteDescription.className = "text-black text-sm";
    recetteDescription.textContent = description;

    // Ingredients
    const ingredientsSection = document.createElement("div");
    ingredientsSection.className = "mt-4";

    const ingredientsLabel = document.createElement("p");
    ingredientsLabel.className = "text-gray-500 font-bold mb-2 text-sm uppercase";
    ingredientsLabel.textContent = "INGRÉDIENTS";

    imageContainer.appendChild(img);
    imageContainer.appendChild(timeSpan);
    recetteSection.appendChild(recetteLabel);
    recetteSection.appendChild(recetteDescription);
    ingredientsSection.appendChild(ingredientsLabel);

    contentContainer.appendChild(title);
    contentContainer.appendChild(recetteSection);
    contentContainer.appendChild(ingredientsSection);
    article.appendChild(imageContainer);
    article.appendChild(contentContainer);

    return article;
  }
  return { getUserCardDOM };
}