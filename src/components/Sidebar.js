import React from "react";
import BookmarkIcon from "../Icons/bookmark.svg";
import ExploreIcon from "../Icons/explore.svg";
import HomeIcon from "../Icons/home.svg";
import ListsIcon from "../Icons/lists.svg";
import MessagesIcon from "../Icons/messages.svg";
import MoreIcon from "../Icons/more.svg";
import NotificationsIcon from "../Icons/notifications.svg";
import ProfileIcon from "../Icons/profile.svg";
import TwitterIcon from "../Icons/twitter.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a href="index.html">
        <img src={TwitterIcon} alt="" className="sidebar__twittericon" />
      </a>
      <nav className="sidebar__nav">
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={HomeIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">Home</span>
          </div>
        </a>
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={ExploreIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">Explore</span>
          </div>
        </a>
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={NotificationsIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">Notifications</span>
          </div>
        </a>
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={MessagesIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">Messages</span>
          </div>
        </a>
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={BookmarkIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">Bookmarks</span>
          </div>
        </a>
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={ListsIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">Lists</span>
          </div>
        </a>
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={ProfileIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">Profile</span>
          </div>
        </a>
        <a href="#">
          <div className="sidebar__nav__link">
            <img src={MoreIcon} alt="" className="icon" />
            <span className="sidebar__nav__link__text">More</span>
          </div>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
