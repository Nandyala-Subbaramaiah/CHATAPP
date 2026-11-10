import React from "react";
import { Link } from "react-router-dom";
import ShopHeader from "../../../components/layout/ShopHeader";
import CartItem from "../components/CartItem";
import { useCart } from "../CartContext";
import { formatPrice } from "../../shop/data/products";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="shop-page">
      <ShopHeader />
      <main className="cart-page">
        <div className="cart-heading">
          <div>
            <p className="shop-eyebrow">Your sweet selection</p>
            <h1>Your cart <span>({itemCount})</span></h1>
          </div>
          <Link className="cart-continue" to="/shop">← Continue shopping</Link>
        </div>

        {items.length > 0 ? (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Items in your cart">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </section>
            <aside className="cart-summary">
              <p className="shop-eyebrow">Almost yours</p>
              <h2>Order summary</h2>
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="cart-summary__shipping">Shipping and taxes are calculated at checkout.</p>
              <button className="button button--dark cart-summary__checkout" type="button" disabled>
                Checkout <span aria-hidden="true">→</span>
              </button>
              <p className="cart-summary__note">Online checkout is coming soon. Your cart is just a preview for now.</p>
            </aside>
          </div>
        ) : (
          <section className="cart-empty">
            <span className="cart-empty__illustration" aria-hidden="true">🍡</span>
            <p className="shop-eyebrow">Room for something lovely</p>
            <h2>Your cart is waiting for a treat</h2>
            <p>Explore the collection and add something sweet to your day.</p>
            <Link className="button button--dark" to="/shop">Explore the sweets</Link>
          </section>
        )}
      </main>
    </div>
  );
}
