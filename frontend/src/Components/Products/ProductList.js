import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import "./products.css";
import {
  getIngredientCategory,
  getAllIngredientsCatalog,
  INGREDIENT_CATEGORIES,
  normalizeIngredientName,
} from "../../data/ingredientCategories";

function getMealIngredients(meal) {
  return Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
    .map((v) => String(v || "").trim())
    .filter(Boolean);
}

function ingredientImageUrl(ingredientName) {
  // TheMealDB ingredient images (works with the provided data).
  const encoded = encodeURIComponent(ingredientName.trim());
  return `https://www.themealdb.com/images/ingredients/${encoded}-Small.png`;
}


const ProductList = () => {
  const [meals, setMeals] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle"); // idle | loading | success | error
  const [fetchError, setFetchError] = useState("");

  const [ingredientSearch, setIngredientSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]); // array of display names
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const ingredientIndex = useMemo(() => {
    return getAllIngredientsCatalog();
  }, []);

  const selectedKeys = useMemo(() => {
    return new Set(selectedIngredients.map(normalizeIngredientName));
  }, [selectedIngredients]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMealsByIngredient(ingredient) {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        ingredient
      )}`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json = await res.json();
      return Array.isArray(json?.meals) ? json.meals : [];
    }

    async function fetchMealDetails(idMeal) {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(
        idMeal
      )}`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json = await res.json();
      const meal = Array.isArray(json?.meals) ? json.meals[0] : null;
      return meal || null;
    }

    async function load() {
      try {
        setFetchError("");

        if (selectedKeys.size === 0) {
          setMeals([]);
          setFetchStatus("idle");
          return;
        }

        setFetchStatus("loading");

        // 1) Fetch candidate meals for each selected ingredient.
        const selectedList = Array.from(selectedKeys);
        const filterResults = await Promise.all(
          selectedList.map((i) => fetchMealsByIngredient(i))
        );

        // 2) Union by idMeal.
        const idSet = new Set();
        for (const list of filterResults) {
          for (const m of list) {
            if (m?.idMeal) idSet.add(m.idMeal);
          }
        }

        // Limit to avoid huge fan-out.
        const ids = Array.from(idSet).slice(0, 48);

        // 3) Lookup full details for ranking by overlaps.
        const details = await Promise.all(ids.map((id) => fetchMealDetails(id)));
        const mealsFull = details.filter(Boolean);

        setMeals(mealsFull);
        setFetchStatus("success");
      } catch (e) {
        if (e?.name === "AbortError") return;
        setMeals([]);
        setFetchStatus("error");
        setFetchError(e?.message || "Failed to load meals");
      }
    }

    load();
    return () => controller.abort();
  }, [selectedKeys]);

  const visibleIngredients = useMemo(() => {
    const q = ingredientSearch.trim().toLowerCase();
    if (!q) return ingredientIndex;
    return ingredientIndex.filter((x) =>
      x.displayName.toLowerCase().includes(q)
    );
  }, [ingredientIndex, ingredientSearch]);

  const visibleByCategory = useMemo(() => {
    const groups = new Map(INGREDIENT_CATEGORIES.map((c) => [c, []]));

    for (const ing of visibleIngredients) {
      const category = getIngredientCategory(ing.displayName);
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(ing);
    }

    for (const [category, items] of groups.entries()) {
      items.sort((a, b) => a.displayName.localeCompare(b.displayName));
      groups.set(category, items);
    }

    // Keep declared order first, then any extra categories at end.
    const ordered = [];
    for (const c of INGREDIENT_CATEGORIES) {
      ordered.push([c, groups.get(c) || []]);
      groups.delete(c);
    }
    for (const [c, items] of groups.entries()) ordered.push([c, items]);
    return ordered;
  }, [visibleIngredients]);

  useEffect(() => {
    setCollapsedCategories((prev) => {
      const next = { ...prev };
      for (const [category] of visibleByCategory) {
        if (typeof next[category] !== "boolean") {
          next[category] = false; // expanded by default
        }
      }
      return next;
    });
  }, [visibleByCategory]);

  const rankedMatches = useMemo(() => {
    if (selectedKeys.size === 0) return [];

    const scored = meals
      .map((meal) => {
        const mealIngredients = getMealIngredients(meal);
        const mealKeys = new Set(mealIngredients.map(normalizeIngredientName));
        let matchCount = 0;
        for (const k of selectedKeys) {
          if (mealKeys.has(k)) matchCount += 1;
        }

        if (matchCount === 0) return null; // partial matching only: must match at least 1
        return {
          meal,
          matchCount,
          mealIngredients,
        };
      })
      .filter(Boolean);

    scored.sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return String(a.meal?.strMeal || "").localeCompare(
        String(b.meal?.strMeal || "")
      );
    });

    return scored;
  }, [meals, selectedKeys]);

  function toggleIngredient(displayName) {
    const key = normalizeIngredientName(displayName);
    setSelectedIngredients((prev) => {
      const prevKeys = new Set(prev.map(normalizeIngredientName));
      if (prevKeys.has(key)) {
        return prev.filter((x) => normalizeIngredientName(x) !== key);
      }
      return [...prev, displayName];
    });
  }

  function clearSelection() {
    setSelectedIngredients([]);
  }

  function toggleCategory(category) {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }

  return (
    <div className="component-container">
      <div className="ibfp-shell">
        <div className="ibfp-header">
          <div>
            <h1 className="ibfp-title">Ingredient-Based Food Picker</h1>
            <p className="ibfp-subtitle">
              Select ingredients you already have. Recipes are ranked by how
              many of your selected ingredients they match.
            </p>
          </div>

          <div className="ibfp-actions">
            {fetchStatus === "loading" ? (
              <div className="ibfp-resultsMeta">Loading meals…</div>
            ) : null}
            <div className="ibfp-selectedCount">
              Selected: <strong>{selectedIngredients.length}</strong>
            </div>
            <button
              className="ibfp-btn"
              onClick={clearSelection}
              disabled={selectedIngredients.length === 0}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="ibfp-grid">
          <aside className="ibfp-panel">
            <div className="ibfp-panelHeader">
              <h2 className="ibfp-panelTitle">Ingredients</h2>
              <input
                className="ibfp-input"
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                placeholder="Search ingredients..."
                aria-label="Search ingredients"
              />
            </div>

            {fetchStatus === "error" ? (
              <div className="ibfp-emptyState">
                <div className="ibfp-emptyTitle">Couldn’t load meals</div>
                <div className="ibfp-emptyText">{fetchError}</div>
                <button
                  className="ibfp-btn"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            ) : null}

            {selectedIngredients.length > 0 && (
              <div className="ibfp-selectedBar">
                {selectedIngredients
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((name) => (
                    <button
                      key={normalizeIngredientName(name)}
                      className="ibfp-chip ibfp-chipSelected"
                      onClick={() => toggleIngredient(name)}
                      title="Click to remove"
                    >
                      {name}
                      <span className="ibfp-chipX">×</span>
                    </button>
                  ))}
              </div>
            )}

            <div className="ibfp-ingredientGroups">
              {visibleByCategory.map(([category, items]) => {
                if (!items || items.length === 0) return null;
                const isCollapsed = Boolean(collapsedCategories[category]);
                return (
                  <section key={category} className="ibfp-ingredientGroup">
                    <button
                      className="ibfp-ingredientGroupHeader ibfp-ingredientGroupToggle"
                      type="button"
                      onClick={() => toggleCategory(category)}
                      aria-expanded={!isCollapsed}
                    >
                      <div className="ibfp-ingredientGroupTitle">{category}</div>
                      <div className="ibfp-ingredientGroupRight">
                        <div className="ibfp-ingredientGroupCount">
                          {items.length}
                        </div>
                        <span className="ibfp-ingredientChevron">
                          {isCollapsed ? "▸" : "▾"}
                        </span>
                      </div>
                    </button>

                    {!isCollapsed ? (
                      <div className="ibfp-ingredientList" role="list">
                        {items.map((ing) => {
                          const isSelected = selectedKeys.has(ing.key);
                          return (
                            <button
                              key={ing.key}
                              className={
                                isSelected
                                  ? "ibfp-ingredientCard ibfp-ingredientCardSelected"
                                  : "ibfp-ingredientCard"
                              }
                              onClick={() => toggleIngredient(ing.displayName)}
                              role="listitem"
                              type="button"
                            >
                              <img
                                className="ibfp-ingredientImg"
                                src={ingredientImageUrl(ing.displayName)}
                                alt={ing.displayName}
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.style.visibility = "hidden";
                                }}
                              />
                              <div className="ibfp-ingredientName">
                                {ing.displayName}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </section>
                );
              })}
            </div>
          </aside>

          <main className="ibfp-results">
            <div className="ibfp-resultsHeader">
              <h2 className="ibfp-panelTitle">Recipes</h2>
              {fetchStatus === "loading" ? (
                <div className="ibfp-resultsMeta">Finding recipes…</div>
              ) : selectedIngredients.length > 0 ? (
                <div className="ibfp-resultsMeta">
                  Showing <strong>{rankedMatches.length}</strong> match
                  {rankedMatches.length === 1 ? "" : "es"}, ranked by relevance
                </div>
              ) : (
                <div className="ibfp-resultsMeta">
                  Select at least one ingredient to see matches.
                </div>
              )}
            </div>

            <div className="product-list">
              {rankedMatches.map(({ meal, matchCount }) => (
                <ProductCard
                  key={meal.idMeal}
                  product={meal}
                  matchCount={matchCount}
                  selectedCount={selectedIngredients.length}
                  selectedKeys={selectedKeys}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
