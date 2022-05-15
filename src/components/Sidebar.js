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
      <a href="#">
        <img src={TwitterIcon} alt="" className="twittericon" />
      </a>
      <nav className="navbar">
        <a href="#">
          <div className="navlink">
            <img src={HomeIcon} alt="" className="icon" />
            Home
          </div>
        </a>
        <a href="#">
          <div className="navlink">
            <img src={ExploreIcon} alt="" className="icon" />
            Explore
          </div>
        </a>
        <a href="#">
          <div className="navlink">
            <img src={NotificationsIcon} alt="" className="icon" />
            Notifications
          </div>
        </a>
        <a href="#">
          <div className="navlink">
            <img src={MessagesIcon} alt="" className="icon" />
            Messages
          </div>
        </a>
        <a href="#">
          <div className="navlink">
            <img src={BookmarkIcon} alt="" className="icon" />
            Bookmark
          </div>
        </a>
        <a href="#">
          <div className="navlink">
            <img src={ListsIcon} alt="" className="icon" />
            Lists
          </div>
        </a>
        <a href="#">
          <div className="navlink">
            <img src={ProfileIcon} alt="" className="icon" />
            Profile
          </div>
        </a>
        <a href="#">
          <div className="navlink">
            <img src={MoreIcon} alt="" className="icon" />
            More
          </div>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
