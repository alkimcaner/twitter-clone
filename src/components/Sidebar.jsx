import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { UserContext } from "../App";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
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
  FaGoogle,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const context = useContext(UserContext);

  function toggleDark() {
    context.setDark((currentValue) => {
      return !currentValue;
    });
  }

  async function loginGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  }

  onAuthStateChanged(auth, (currentUser) => {
    context?.setUser(currentUser);
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
        {context?.user ? (
          <button onClick={logOut} className={styles.login}>
            <FaSignOutAlt />
            <span className={styles.logintext}>Logout</span>
          </button>
        ) : (
          <button onClick={loginGoogle} className={styles.login}>
            <FaGoogle />
            <span className={styles.logintext}>Login With Google</span>
          </button>
        )}
      </nav>
      {/* dark mode */}
      <div>
        <button onClick={toggleDark} className={styles.toggleDark}>
          {context.dark ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
