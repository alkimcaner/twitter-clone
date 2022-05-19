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

import {
  FaTwitter,
  FaHouseUser,
  FaHashtag,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaFileAlt,
  FaRegUserCircle,
  FaEllipsisH,
} from "react-icons/fa";
import SidebarLink from "./SidebarLink";

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
      <div className={styles.twittericon}>
        <FaTwitter />
      </div>
      <nav className={styles.nav}>
        <SidebarLink Link="Home" Icon={FaHouseUser} />
        <SidebarLink Link="Explore" Icon={FaHashtag} />
        <SidebarLink Link="Notifications" Icon={FaBell} />
        <SidebarLink Link="Messages" Icon={FaEnvelope} />
        <SidebarLink Link="Bookmarks" Icon={FaBookmark} />
        <SidebarLink Link="Lists" Icon={FaFileAlt} />
        <SidebarLink Link="Profile" Icon={FaRegUserCircle} />
        <SidebarLink Link="More" Icon={FaEllipsisH} />
        {/* login button */}
        {context.user ? (
          <button onClick={logOut} className={styles.login}>
            Logout
          </button>
        ) : (
          <button onClick={loginGoogle} className={styles.login}>
            Login With Google
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
