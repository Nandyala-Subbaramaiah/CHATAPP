import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ShopHeader from "../../../components/layout/ShopHeader";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categories = ["All sweets", "Traditional", "Cakes", "Chocolates"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All sweets");
  const [search, setSearch] = useState("");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All sweets" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="shop-page">
      <ShopHeader />
      <main>
        <section className="shop-hero">
          <div className="shop-hero__content">
            <p className="shop-eyebrow"><span /> A little sweetness, made daily</p>
            <h1>Made with love.<br /><em>Wrapped in joy.</em></h1>
            <p className="shop-hero__copy">
              Thoughtful treats, time-honored recipes, and the good kind of
              something-sweet for every day.
            </p>
            <a className="button button--dark" href="#shop-sweets">
              Find your favorite <span aria-hidden="true">↓</span>
            </a>
            <div className="shop-hero__note">
              <span aria-hidden="true">✿</span>
              Small batches, always fresh
            </div>
          </div>
          <div className="shop-hero__art" aria-label="A selection of sweets">
            <div className="hero-sweet hero-sweet--one" aria-hidden="true">🍰</div>
            <div className="hero-sweet hero-sweet--two" aria-hidden="true">🟠</div>
            <div className="hero-sweet hero-sweet--three" aria-hidden="true">🍡</div>
            <div className="shop-hero__sun" aria-hidden="true" />
            <span className="shop-hero__caption">A box full of happy</span>
          </div>
          <span className="shop-hero__side-note" aria-hidden="true">HANDCRAFTED WITH HEART</span>
        </section>

        <section className="shop-products" id="shop-sweets">
          <div className="shop-section-heading">
            <div>
              <p className="shop-eyebrow">The good stuff</p>
              <h2>Find your little joy</h2>
            </div>
            <label className="shop-search">
              <span aria-hidden="true">⌕</span>
              <span className="visually-hidden">Search sweets</span>
              <input
                type="search"
                placeholder="Search sweets..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          <div className="shop-filters" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                className={`shop-filter${activeCategory === category ? " is-active" : ""}`}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
            <span className="shop-result-count">
              {visibleProducts.length} {visibleProducts.length === 1 ? "treat" : "treats"}
            </span>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop-empty-results">
              <span aria-hidden="true">🍬</span>
              <h3>No treats found just yet</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="button button--outline"
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All sweets");
                }}
              >
                Show all sweets
              </button>
            </div>
          )}
        </section>

        <section className="shop-story" id="our-story">
          <div className="shop-story__ornament" aria-hidden="true">✳</div>
          <p className="shop-eyebrow">A sweeter kind of tradition</p>
          <h2>Good things take<br /><em>a little sweetness.</em></h2>
          <p>
            From the first stir of the pan to the last ribbon on the box, every
            treat is made with care, good ingredients, and a reason to share.
          </p>
        </section>
      </main>
      <footer className="shop-footer">
        <Link className="shop-brand" to="/shop">
          <span className="shop-brand__mark" aria-hidden="true">S</span>
          <span className="shop-brand__name">
            <span className="shop-brand__name-main">Sri Prasanna Lakshmi</span>
            <span className="shop-brand__name-sub">Sweets Bakery</span>
          </span>
        </Link>
        <span>Made for sharing, best enjoyed together.</span>
      </footer>
    </div>
  );
}
