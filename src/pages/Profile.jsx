import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { Outlet, Link, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
//Firebase
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore/lite";
//Components
import PageTitle from "../components/PageTitle";
//Icons
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      const profileDoc = await getDoc(doc(db, "users", params.id));
      setProfile(profileDoc.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [params.id]);

  return (
    <div className={styles.profile}>
      {profile ? (
        <>
          <PageTitle page={profile.name} back={true} />
          <div className={styles.banner}>
            <img
              src={profile.userPhoto}
              alt="avatar"
              className={styles.avatar}
            />
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.name}>{profile.name}</div>
              <span className={styles.username}>
                @{profile.name?.toLowerCase().replace(/\s+/g, "")}
              </span>
            </div>
            <div className={styles.createdAt}>
              <FaCalendarAlt /> Joined{" "}
              {new Date(parseInt(profile.createdAt)).toDateString()}
            </div>
            <div className={styles.lastonline}>
              <HiOutlineStatusOnline /> Last Online:{" "}
              <TimeAgo date={parseInt(profile.lastLogin) || Date.now()} />
            </div>
          </div>
          <div className={styles.menu}>
            <Link to="" className={styles.menulink}>
              <span>Tweets</span>
            </Link>
            <Link to="likes" className={styles.menulink}>
              <span>Likes</span>
            </Link>
            <Link to="replies" className={styles.menulink}>
              <span>Replies</span>
            </Link>
          </div>
          <Outlet />
        </>
      ) : (
        <div>Invalid user</div>
      )}
    </div>
  );
};

export default Profile;
