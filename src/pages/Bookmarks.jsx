import React, { useState, useContext, useEffect } from "react";
import styles from "./Bookmarks.module.css";
import { UserContext } from "../App";
import PageTitle from "../components/PageTitle";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";
import Tweet from "../components/Tweet";

const Bookmarks = () => {
  const context = useContext(UserContext);
  const [tweets, setTweets] = useState([]);

  async function getTweets() {
    try {
      const tweetsCollection = query(
        collection(db, "tweets"),
        where("bookmarks", "array-contains", context?.user?.uid || "")
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
    getTweets();
  }, [context.user]);

  return (
    <div className={styles.bookmarks}>
      <PageTitle page="Bookmarks" back={false} />
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default Bookmarks;
