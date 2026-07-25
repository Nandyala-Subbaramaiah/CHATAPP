import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import ChatPage from "./pages/ChatPage";

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