import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/CartContext";
import { formatPrice } from "../data/products";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <Link
        className={`product-card__art product-art product-art--${product.color}`}
        to={`/products/${product.id}`}
        aria-label={`View ${product.name}`}
      >
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
        <span className="product-art__emoji" aria-hidden="true">{product.emoji}</span>
        <span className="product-art__dots" aria-hidden="true">✦ &nbsp; ✦</span>
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span className="product-card__rating" aria-label={`${product.rating} out of 5 stars`}>
            ★ {product.rating}
          </span>
        </div>
        <Link className="product-card__name" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <p className="product-card__unit">{product.unit}</p>
        <div className="product-card__footer">
          <strong>{formatPrice(product.price)}</strong>
          <button
            className="button button--add"
            type="button"
            onClick={() => addItem(product.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            <span aria-hidden="true">+</span> Add
          </button>
        </div>
      </div>
    </article>
  );
}
