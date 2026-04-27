export function normalizeIngredientName(name) {
  return String(name || "").trim().toLowerCase();
}

export const INGREDIENT_CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Oils & Fats",
  "Pantry Essentials",
];

// Curated, realistic starter catalog. Expand freely (the UI auto-updates).
export const INGREDIENTS_BY_CATEGORY = {
  Vegetables: [
    "Garlic",
    "Onion",
    "Shallot",
    "Leek",
    "Scallion",
    "Chives",
    "Ginger",
    "Galangal",
    "Carrot",
    "Celery",
    "Bell pepper",
    "Chili pepper",
    "Jalapeño",
    "Zucchini",
    "Eggplant",
    "Mushroom",
    "Spinach",
    "Kale",
    "Cabbage",
    "Broccoli",
    "Cauliflower",
    "Green beans",
    "Peas",
    "Corn",
    "Cucumber",
    "Lettuce",
    "Arugula",
    "Potato",
    "Sweet potato",
    "Tomatillo",
    "Pumpkin",
    "Butternut squash",
  ],
  Fruits: [
    "Tomato",
    "Cherry tomato",
    "Lemon",
    "Lime",
    "Orange",
    "Apple",
    "Banana",
    "Pineapple",
    "Mango",
    "Grapes",
    "Strawberry",
    "Blueberry",
    "Avocado",
    "Coconut",
  ],
  "Oils & Fats": [
    "Olive oil",
    "Extra virgin olive oil",
    "Vegetable oil",
    "Canola oil",
    "Sunflower oil",
    "Sesame oil",
    "Coconut oil",
    "Butter",
    "Ghee",
    "Lard",
  ],
  "Pantry Essentials": [
    "Salt",
    "Black pepper",
    "Sugar",
    "Brown sugar",
    "Caster sugar",
    "Flour",
    "Cornstarch",
    "Baking powder",
    "Baking soda",
    "Rice",
    "Pasta",
    "Bread crumbs",
    "Soy sauce",
    "Fish sauce",
    "Oyster sauce",
    "Vinegar",
    "Red wine vinegar",
    "Sherry vinegar",
    "White vinegar",
    "Apple cider vinegar",
    "Tomato paste",
    "Canned tomato",
    "Crushed tomato",
    "Chopped tomatoes",
    "Canned diced tomato",
    "Stock",
    "Water",
    "Honey",
    "Maple syrup",
    "Peanut butter",
    "Mustard",
    "Mayonnaise",
    "Ketchup",
    "Paprika",
    "Smoked paprika",
    "Cumin",
    "Coriander",
    "Cinnamon",
    "Nutmeg",
    "Dried oregano",
    "Dried basil",
    "Thyme",
    "Bay leaves",
    "Chili flakes",
    "Curry powder",
    "Garam masala",
    "Mirin",
    "Sake",
    "Kombu",
    "Nori",
  ],
};

const CATEGORY_BY_NORMALIZED_INGREDIENT = (() => {
  const map = new Map();
  for (const [category, items] of Object.entries(INGREDIENTS_BY_CATEGORY)) {
    for (const item of items) {
      const key = normalizeIngredientName(item);
      if (!key) continue;
      if (!map.has(key)) map.set(key, category);
    }
  }
  return map;
})();

export function getIngredientCategory(ingredientName) {
  const n = normalizeIngredientName(ingredientName);
  return (
    CATEGORY_BY_NORMALIZED_INGREDIENT.get(n) ??
    // Default bucket so every ingredient appears somewhere.
    "Pantry Essentials"
  );
}

export function getAllIngredientsCatalog() {
  const seen = new Set();
  const out = [];
  for (const category of INGREDIENT_CATEGORIES) {
    const items = INGREDIENTS_BY_CATEGORY[category] || [];
    for (const item of items) {
      const key = normalizeIngredientName(item);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push({ key, displayName: item });
    }
  }
  return out.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

