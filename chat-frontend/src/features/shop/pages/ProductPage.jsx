import React from "react";
import { Link, useParams } from "react-router-dom";
import ShopHeader from "../../../components/layout/ShopHeader";
import { useCart } from "../../cart/CartContext";
import { formatPrice, getProduct } from "../data/products";

export default function ProductPage() {
  const { productId } = useParams();
  const product = getProduct(productId);
  const { addItem } = useCart();

  return (
    <div className="shop-page">
      <ShopHeader />
      <main className="product-detail">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <span>{product ? product.name : "Treat not found"}</span>
        </nav>

        {product ? (
          <div className="product-detail__layout">
            <div className={`product-detail__art product-art product-art--${product.color}`}>
              <span className="product-art__emoji" aria-hidden="true">{product.emoji}</span>
              <span className="product-art__dots" aria-hidden="true">✦ &nbsp; ✦ &nbsp; ✦</span>
            </div>
            <section className="product-detail__info">
              <p className="shop-eyebrow">{product.category} · Made fresh</p>
              <h1>{product.name}</h1>
              <p className="product-detail__rating">★ {product.rating} <span>Made with care in small batches</span></p>
              <p className="product-detail__description">{product.description}</p>
              <p className="product-detail__unit">{product.unit}</p>
              <p className="product-detail__price">{formatPrice(product.price)}</p>
              <button
                className="button button--dark product-detail__button"
                type="button"
                onClick={() => addItem(product.id)}
              >
                Add to cart <span aria-hidden="true">→</span>
              </button>
              <p className="product-detail__note">Freshly packed with love. Perfect for gifting or keeping.</p>
            </section>
          </div>
        ) : (
          <div className="product-not-found">
            <span aria-hidden="true">🍬</span>
            <h1>We couldn't find that treat</h1>
            <p>It may have sold out. There are plenty more sweets to discover.</p>
            <Link className="button button--dark" to="/shop">Browse all sweets</Link>
          </div>
        )}
      </main>
    </div>
  );
}
