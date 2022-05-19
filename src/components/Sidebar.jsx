import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { UserContext } from "../App";
import { auth } from "../firebase";
import {
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

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
  const context = useContext(UserContext);

  async function loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithRedirect(auth, provider);
    } catch (err) {
      console.log(err);
    }
  }

  async function logOut() {
    await signOut(auth);
  }

  onAuthStateChanged(auth, (currentUser) => {
    context.setUser(currentUser);
  });

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
        {/* login button */}
        {context.user ? (
          <button onClick={logOut}>Logout</button>
        ) : (
          <button onClick={loginGoogle}>Login With Google</button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
