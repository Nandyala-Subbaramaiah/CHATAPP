import React, { createContext, useContext, useMemo, useState } from "react";
import { getProduct } from "../shop/data/products";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [quantities, setQuantities] = useState({});

  function addItem(productId) {
    if (!getProduct(productId)) {
      throw new Error(`Unknown product: ${productId}`);
    }

    setQuantities((current) => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  }

  function updateQuantity(productId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new Error("Cart quantity must be a non-negative whole number.");
    }

    setQuantities((current) => {
      if (quantity === 0) {
        const next = { ...current };
        delete next[productId];
        return next;
      }

      return { ...current, [productId]: quantity };
    });
  }

  function removeItem(productId) {
    updateQuantity(productId, 0);
  }

  const items = useMemo(
    () =>
      Object.entries(quantities)
        .map(([productId, quantity]) => {
          const product = getProduct(productId);
          return product ? { ...product, quantity } : null;
        })
        .filter(Boolean),
    [quantities],
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (cart === undefined) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return cart;
}
