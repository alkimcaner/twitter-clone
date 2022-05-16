import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widget from "./components/Widget";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Sidebar />
      <Feed />
      <Widget />
    </div>
  );
}

export default App;
