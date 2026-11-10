import React, { createContext, useContext } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  return (
    <UserContext.Provider value="Alex">
      {children}
    </UserContext.Provider>
  );
} 
  
export function useUser() {
  const userName = useContext(UserContext);

  if (userName === undefined) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return userName;
}
