import React, { createContext, useState, useLayoutEffect } from "react";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [dark, setDark] = useState(
    JSON.parse(localStorage.getItem("dark")) ?? false
  );

  useLayoutEffect(() => {
    localStorage.setItem("dark", dark);
    if (dark) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [dark]);

  return (
    <UserContext.Provider value={{ user, setUser, dark, setDark }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
