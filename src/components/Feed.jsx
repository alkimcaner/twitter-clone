import { React, useState, useEffect } from "react";
import styles from "./Feed.module.css";
import Tweet from "./Tweet";
import Tweetbox from "./Tweetbox";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  async function fetchTweets() {
    const tweetsCollection = collection(db, "tweets");
    const tweetsSnapshot = await getDocs(tweetsCollection);
    setTweets(tweetsSnapshot.docs.map((doc) => doc.data()));
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <div className={styles.feed}>
      <a href="#" className={styles.home}>
        Home
      </a>
      <Tweetbox />
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default Feed;
