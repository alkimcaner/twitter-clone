import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import {
  getDoc,
  getDocs,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore/lite";
import { db } from "../firebase";
import PageTitle from "../components/PageTitle";
import Tweet from "../components/Tweet";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import TimeAgo from "react-timeago";

const Profile = () => {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [tweets, setTweets] = useState([]);

  async function getProfile() {
    try {
      const profileDoc = await getDoc(doc(db, "users", params.id));
      setProfile(profileDoc.data());
    } catch (error) {
      console.log(error);
    }
  }

  async function getTweets() {
    try {
      const tweetsCollection = query(
        collection(db, "tweets"),
        where("uid", "==", params.id)
      );
      const tweetsSnapshot = await getDocs(tweetsCollection);
      const sortedTweets = tweetsSnapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .sort((a, b) => (a.time < b.time ? 1 : -1));

      setTweets(sortedTweets);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
    getTweets();
    console.log();
  }, []);

  return (
    <div className={styles.profile}>
      <PageTitle Page={profile.name} />
      <div className={styles.banner}>
        <img src={profile.userPhoto} alt="avatar" className={styles.avatar} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{profile.name}</div>
        <div className={styles.createdAt}>
          <FaCalendarAlt /> Joined{" "}
          {new Date(parseInt(profile.createdAt)).toDateString()}
        </div>
        <div className={styles.lastonline}>
          <HiOutlineStatusOnline /> Last Online:{" "}
          <TimeAgo date={parseInt(profile.lastLogin)} />
        </div>
      </div>
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default Profile;
