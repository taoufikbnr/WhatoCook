export function normalizeIngredientName(name) {
  return String(name || "").trim().toLowerCase();
}

export const INGREDIENT_CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Oils & Fats",
  "Pantry Essentials",
  "Proteins",
  "Seafood",
];

// Curated, realistic starter catalog. Expand freely (the UI auto-updates).
export const INGREDIENTS_BY_CATEGORY = {
  Vegetables: [
    "Garlic",
    "Onion",
    "Red Onion",
    "Spring Onions",
    "White Cabbage",
    "Red Cabbage",
    "Leek",
    "Chives",
    "Ginger",
    "Galangal",
    "Carrot",
    "Celery",
    "Green pepper",
    "Red pepper",
    "Zucchini",
    "Egg plants",
    "Shiitake Mushrooms",
    "Spinach",
    "Kale",
    "Cabbage",
    "Broccoli",
    "Green beans",
    "Peas",
    "Cucumber",
    "Lettuce",
    "Celery",
    "Potato",
    "Sweet potato",
    "tomatoes",
    "Pumpkin",
    "Butternut squash",
    "Jalapeno",
  ],
  Fruits: [
    "Tomato",
    "Lemon",
    "Lime",
    "Orange",
    "Peaches",
    "Apple",
    "Banana",
    "Pineapple",
    "Mango",
    "Grapes",
    "Strawberries",
    "Blueberries",
    "Blackberries",
    "Avocado",
    "Desiccated Coconut",
    "Stoned Dates",
  ],
  "Oils & Fats": [
    "Olive oil",
    "Extra virgin olive oil",
    "Vegetable oil",
    "Canola oil",
    "Sunflower oil",
    "Coconut Milk",
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
    "Rice",
    "Breadcrumbs",
    "Soy sauce",
    "Fish sauce",
    "Oyster sauce",
    "Vinegar",
    "Red wine vinegar",
    "Sherry vinegar",
    "White vinegar",
    "Apple cider vinegar",
    "Tomato Puree",
    "Canned tomatoes",
    "Tinned Tomatos",
    "Chopped tomatoes",
    "Water",
    "Honey",
    "Maple syrup",
    "Peanut butter",
    "Mustard",
    "Mayonnaise",
    "Paprika",
    "Smoked paprika",
    "Cumin",
    "Coriander",
    "Cinnamon",
    "Nutmeg",
    "Dried oregano",
    "Basil Leaves",
    "Thyme",
    "Bay leaves",
    "Chilli Flakes",
    "Curry powder",
    "Garam masala",
    "Mirin",
    "Sake",
    "Capers",
    "Rocket",
    "Farfalle",
    "Baking Powder",
    "Vanilla Extract"

  ],
  "Proteins":[
    "Egg",
    "Chicken",
    "Beef",
  ],
  "Seafood":[
    "White Fish",
    "Squid",
    "Salmon",
    "Shrimp",
    "Tuna",
  ]
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

