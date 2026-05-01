import React, { useMemo, useState } from "react";
import "./products.css";

function normalizeIngredientName(name) {
  return String(name || "").trim().toLowerCase();
}

function getMealIngredients(meal) {
  return Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
    .map((v) => String(v || "").trim())
    .filter(Boolean);
}

const ProductCard = ({ product, matchCount, selectedCount, selectedKeys }) => {
  const [expanded, setExpanded] = useState(false);

  const ingredients = useMemo(() => getMealIngredients(product), [product]);

  const matchedIngredients = useMemo(() => {
    return ingredients.filter((i) => selectedKeys.has(normalizeIngredientName(i)));
  }, [ingredients, selectedKeys]);

  return (
    <article className="ibfp-recipeCard">
      <div className="ibfp-recipeTop">
        <img
          src={product.strMealThumb}
          alt={product.strMeal}
          className="ibfp-recipeImg"
          loading="lazy"
        />

        <div className="ibfp-recipeTopBody">
          <div className="ibfp-recipeTitleRow">
            <h3 className="ibfp-recipeTitle">{product.strMeal}</h3>
            <div className="ibfp-score">
              {matchCount}/{selectedCount}
            </div>
          </div>

          <div className="ibfp-recipeMeta">
            {product.strArea ? <span>{product.strArea}</span> : null}
            {product.strCategory ? <span> · {product.strCategory}</span> : null}
          </div>

          <div className="ibfp-chipRow">
            {matchedIngredients.slice(0, 8).map((name) => (
              <span
                key={normalizeIngredientName(name)}
                className="ibfp-chip ibfp-chipMatch"
              >
                {name}
              </span>
            ))}
            {matchedIngredients.length > 8 ? (
              <span className="ibfp-chip ibfp-chipMuted">
                +{matchedIngredients.length - 8} more
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="ibfp-recipeBody">
        {expanded ? (
          <>
            <div className="ibfp-sectionLabel">All ingredients</div>
            <div className="ibfp-chipRow">
              {ingredients.map((name) => {
                const isMatch = selectedKeys.has(normalizeIngredientName(name));                
                return (
                  <span
                    key={normalizeIngredientName(name)}
                    className={isMatch ? "ibfp-chip ibfp-chipMatch" : "ibfp-chip"}
                  >
                    {name}
                  </span>
                );
              })}
            </div>

            <div className="ibfp-sectionLabel">Instructions</div>
            <p className="ibfp-instructions">{product.strInstructions}</p>
          </>
        ) : (
          <p className="ibfp-preview">
            {String(product.strInstructions || "").slice(0, 180)}
            {String(product.strInstructions || "").length > 180 ? "…" : ""}
          </p>
        )}

        <div className="ibfp-cardActions">
          {product.strYoutube ? (
            <a
              className="ibfp-btn ibfp-btnSecondary"
              href={product.strYoutube}
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          ) : (
            <span />
          )}

          <button className="ibfp-btn" onClick={() => setExpanded((p) => !p)}>
            {expanded ? "Hide details" : "View recipe"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
