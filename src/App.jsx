import "./App.css";
import { useContext } from "react";
import UserContext from "./UserContext";
import { UserContextProvider } from "./UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Pages
import ProtectedPage from "./pages/ProtectedPage";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
//Components
import Sidebar from "./components/Sidebar";
import Widget from "./components/Widget";
import UserTweets from "./components/UserTweets";
import UserLikes from "./components/UserLikes";
import PageTitle from "./components/PageTitle";
import Comments from "./pages/Comments";
import UserReplies from "./components/UserReplies";

const App = () => {
  const context = useContext(UserContext);

  return (
    <UserContextProvider>
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
                element={
                  <ProtectedPage>
                    <PageTitle page="Explore" back={false} />
                  </ProtectedPage>
                }
              />
              <Route
                path="notifications"
                element={
                  <ProtectedPage>
                    <PageTitle page="Notifications" back={false} />
                  </ProtectedPage>
                }
              />
              <Route
                path="messages"
                element={
                  <ProtectedPage>
                    <PageTitle page="Messages" back={false} />
                  </ProtectedPage>
                }
              />
              <Route
                path="bookmarks"
                element={
                  <ProtectedPage>
                    <Bookmarks />
                  </ProtectedPage>
                }
              />
              <Route
                path="lists"
                element={
                  <ProtectedPage>
                    <PageTitle page="Lists" back={false} />
                  </ProtectedPage>
                }
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
    </UserContextProvider>
  );
};

export default App;
