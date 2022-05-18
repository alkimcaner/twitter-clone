import "./App.css";
import { createContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widget from "./components/Widget";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="app">
        <Sidebar />
        <Feed />
        <Widget />
      </div>
    </UserContext.Provider>
  );
}

export default App;
