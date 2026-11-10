import React from "react";

import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { isAuthenticated } from "./api/authApi";
import LoginPage from "./pages/loginPage";
import UsersPage from "./pages/usersPage";
import ChatPage from "./pages/chatPage";
import ContextPractice from "./pages/ContextPractice";
import { CartProvider } from "./features/cart/CartContext";
import CartPage from "./features/cart/pages/CartPage";
import ProductPage from "./features/shop/pages/ProductPage";
import ShopPage from "./features/shop/pages/ShopPage";
import "./features/shop/shop.css";

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/practice-context"
            element={<ContextPractice />}
          />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat/:conversationId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;