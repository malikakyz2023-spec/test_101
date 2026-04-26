const sampleRecipes = [
  {
    name: "Spaghetti Carbonara",
    desc: "Classic Italian pasta with eggs, Pecorino Romano, pancetta, and black pepper. Rich, creamy, and ready in 20 minutes.",
    favorite: true,
  },
  {
    name: "Chicken Tikka Masala",
    desc: "Tender marinated chicken in a spiced tomato-cream sauce. Serve with basmati rice or warm naan bread.",
    favorite: false,
  },
  {
    name: "Avocado Toast",
    desc: "Smashed avocado on sourdough with a squeeze of lemon, red pepper flakes, and a soft-poached egg on top.",
    favorite: true,
  },
  {
    name: "Chocolate Lava Cake",
    desc: "Warm chocolate cake with a gooey molten center. Best served with a scoop of vanilla ice cream.",
    favorite: false,
  },
];

const nameInput   = document.getElementById("recipe-name");
const descInput   = document.getElementById("recipe-desc");
const addBtn      = document.getElementById("add-btn");
const list        = document.getElementById("recipe-list");
const countBadge  = document.getElementById("recipe-count");
const errorMsg    = document.getElementById("error-msg");
const emptyMsg    = document.getElementById("empty-msg");

let recipes = [];

function sortedRecipes() {
  return [...recipes].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
}

function renderRecipes() {
  list.innerHTML = "";
  emptyMsg.style.display = recipes.length === 0 ? "block" : "none";
  countBadge.textContent = recipes.length;

  sortedRecipes().forEach((recipe) => {
    const index = recipes.indexOf(recipe);
    const li = document.createElement("li");
    li.className = "recipe-item" + (recipe.favorite ? " is-favorite" : "");
    li.innerHTML = `
      <button class="star-btn" data-index="${index}" aria-label="${recipe.favorite ? "Unfavorite" : "Favorite"} ${escapeHTML(recipe.name)}" title="${recipe.favorite ? "Remove from favorites" : "Add to favorites"}">
        ${recipe.favorite ? "★" : "☆"}
      </button>
      <div class="recipe-info">
        <div class="recipe-name">${escapeHTML(recipe.name)}</div>
        <div class="recipe-desc">${escapeHTML(recipe.desc)}</div>
      </div>
      <button class="delete-btn" data-index="${index}" aria-label="Delete ${escapeHTML(recipe.name)}">Delete</button>
    `;
    list.appendChild(li);
  });
}

function addRecipe() {
  const name = nameInput.value.trim();
  const desc = descInput.value.trim();

  if (!name || !desc) {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");
  recipes.unshift({ name, desc, favorite: false });
  nameInput.value = "";
  descInput.value = "";
  nameInput.focus();
  renderRecipes();
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  renderRecipes();
}

function toggleFavorite(index) {
  recipes[index].favorite = !recipes[index].favorite;
  renderRecipes();
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Event listeners
addBtn.addEventListener("click", addRecipe);

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") descInput.focus();
});

descInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.ctrlKey) addRecipe();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteRecipe(Number(e.target.dataset.index));
  } else if (e.target.classList.contains("star-btn")) {
    toggleFavorite(Number(e.target.dataset.index));
  }
});

// Load sample recipes on start
recipes = [...sampleRecipes];
renderRecipes();
