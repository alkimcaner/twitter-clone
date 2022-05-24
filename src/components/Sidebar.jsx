import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebase";
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
  const navigate = useNavigate();

  function toggleDark() {
    context?.setDark((currentValue) => !currentValue);
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
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  onAuthStateChanged(auth, async (currentUser) => {
    try {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, {
          uid: currentUser.uid,
          name: currentUser.displayName,
          userPhoto: currentUser.photoURL,
          createdAt: currentUser.metadata.createdAt,
          lastLogin: currentUser.metadata.lastLoginAt,
        });
      }
    } catch (error) {
      console.log(error);
    }

    context?.setUser(currentUser);
  });

  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <div className={styles.twittericon}>
          <FaTwitter />
        </div>
      </Link>
      <nav className={styles.nav}>
        <SidebarLink path="/" page="Home" Icon={FaHouseUser} />
        {context?.user && (
          <>
            <SidebarLink path="/explore" page="Explore" Icon={FaHashtag} />
            <SidebarLink
              path="/notifications"
              page="Notifications"
              Icon={FaBell}
            />
            <SidebarLink path="/messages" page="Messages" Icon={FaEnvelope} />
            <SidebarLink path="/bookmarks" page="Bookmarks" Icon={FaBookmark} />
            <SidebarLink path="/lists" page="Lists" Icon={FaFileAlt} />
            <SidebarLink
              path={`/user/${context?.user?.uid}`}
              page="Profile"
              Icon={FaRegUserCircle}
            />
          </>
        )}

        <SidebarLink path="" page="More" Icon={FaEllipsisH} />
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
          {context?.dark ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
