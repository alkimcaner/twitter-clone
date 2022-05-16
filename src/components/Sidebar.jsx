import React from "react";
import styles from "./Sidebar.module.css";
import BookmarkIcon from "../assets/Icons/bookmark.svg";
import ExploreIcon from "../assets/Icons/explore.svg";
import HomeIcon from "../assets/Icons/home.svg";
import ListsIcon from "../assets/Icons/lists.svg";
import MessagesIcon from "../assets/Icons/messages.svg";
import MoreIcon from "../assets/Icons/more.svg";
import NotificationsIcon from "../assets/Icons/notifications.svg";
import ProfileIcon from "../assets/Icons/profile.svg";
import TwitterIcon from "../assets/Icons/twitter.svg";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <a href="index.html">
        <img src={TwitterIcon} alt="" className={styles.twittericon} />
      </a>
      <nav className={styles.nav}>
        <a href="#">
          <div className={styles.link}>
            <img src={HomeIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>Home</span>
          </div>
        </a>
        <a href="#">
          <div className={styles.link}>
            <img src={ExploreIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>Explore</span>
          </div>
        </a>
        <a href="#">
          <div className={styles.link}>
            <img src={NotificationsIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>Notifications</span>
          </div>
        </a>
        <a href="#">
          <div className={styles.link}>
            <img src={MessagesIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>Messages</span>
          </div>
        </a>
        <a href="#">
          <div className={styles.link}>
            <img src={BookmarkIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>Bookmarks</span>
          </div>
        </a>
        <a href="#">
          <div className={styles.link}>
            <img src={ListsIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>Lists</span>
          </div>
        </a>
        <a href="#">
          <div className={styles.link}>
            <img src={ProfileIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>Profile</span>
          </div>
        </a>
        <a href="#">
          <div className={styles.link}>
            <img src={MoreIcon} alt="" className={styles.icon} />
            <span className={styles.linklabel}>More</span>
          </div>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
