import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../features/cart/CartContext";

export default function ShopHeader() {
  const { itemCount } = useCart();

  return (
    <header className="shop-header">
      <div className="shop-header__inner">
        <Link className="shop-brand" to="/shop" aria-label="Sri Prasanna Lakshmi Sweets Bakery home">
          <span className="shop-brand__mark" aria-hidden="true">S</span>
          <span className="shop-brand__name">
            <span className="shop-brand__name-main">Sri Prasanna Lakshmi</span>
            <span className="shop-brand__name-sub">Sweets Bakery</span>
          </span>
        </Link>

        <nav className="shop-nav" aria-label="Main navigation">
          <NavLink to="/shop">Shop</NavLink>
          <Link to="/shop#our-story">Our story</Link>
        </nav>

        <Link className="shop-cart-link" to="/cart" aria-label={`Cart, ${itemCount} items`}>
          <span aria-hidden="true">🛍️</span>
          <span className="shop-cart-link__label">Cart</span>
          <span className="shop-cart-count">{itemCount}</span>
        </Link>
      </div>
    </header>
  );
}
