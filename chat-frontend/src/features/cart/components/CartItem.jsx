import React from "react";
import { formatPrice } from "../../shop/data/products";

export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <article className="cart-item">
      <div className={`cart-item__art product-art product-art--${item.color}`} aria-hidden="true">
        <span className="product-art__emoji">{item.emoji}</span>
      </div>
      <div className="cart-item__details">
        <span className="cart-item__category">{item.category}</span>
        <h2>{item.name}</h2>
        <p>{item.unit}</p>
        <button className="cart-item__remove" type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <div className="cart-item__quantity" aria-label={`${item.name} quantity`}>
        <button
          type="button"
          onClick={() => onQuantityChange(item.quantity - 1)}
          aria-label={`Decrease ${item.name} quantity`}
        >
          −
        </button>
        <span aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onQuantityChange(item.quantity + 1)}
          aria-label={`Increase ${item.name} quantity`}
        >
          +
        </button>
      </div>
      <strong className="cart-item__total">{formatPrice(item.price * item.quantity)}</strong>
    </article>
  );
}
