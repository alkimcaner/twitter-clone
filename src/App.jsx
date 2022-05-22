import "./App.css";
import { createContext, useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widget from "./components/Widget";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [dark, setDark] = useState(false);

  useEffect(() => {
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
      <div className="app">
        <Sidebar />
        <Feed />
        <Widget />
      </div>
    </UserContext.Provider>
  );
}

export default App;
