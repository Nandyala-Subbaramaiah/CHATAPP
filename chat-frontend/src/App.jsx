import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import UsersPage from "./pages/usersPage";
import ChatPage from "./pages/chatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<UsersPage />}
        />

        <Route
          path="/chat/:conversationId"
          element={<ChatPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;