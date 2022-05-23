import "./App.css";
import { createContext, useState, useLayoutEffect } from "react";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Widget from "./components/Widget";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const UserContext = createContext();

function App() {
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
      <Router>
        <div className="app">
          <div className="left">
            <Sidebar />
          </div>
          <div className="middle">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/user/:id" element={<Profile />} />
              <Route path="*" element={<div>Work in progress</div>} />
            </Routes>
          </div>
          <div className="right">
            <Widget />
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
