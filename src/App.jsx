import "./App.css";
import { createContext, useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
import Widget from "./components/Widget";
import UserTweets from "./components/UserTweets";
import UserLikes from "./components/UserLikes";
import PageTitle from "./components/PageTitle";
import Comments from "./pages/Comments";
import UserReplies from "./components/UserReplies";

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
              <Route
                path="explore"
                element={<PageTitle page="Explore" back={false} />}
              />
              <Route
                path="notifications"
                element={<PageTitle page="Notifications" back={false} />}
              />
              <Route
                path="messages"
                element={<PageTitle page="Messages" back={false} />}
              />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route
                path="lists"
                element={<PageTitle page="Lists" back={false} />}
              />
              <Route path="user/:id" element={<Profile />}>
                <Route index element={<UserTweets />} />
                <Route path="likes" element={<UserLikes />} />
                <Route path="replies" element={<UserReplies />} />
              </Route>
              <Route path="comments/:id" element={<Comments />} />
              <Route path="search" element={<Search />} />
              <Route path="*" element={<div>Invalid page</div>} />
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
