import React, { useState, useEffect, useContext } from "react";
import styles from "./Feed.module.css";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore/lite";
import Tweet from "./Tweet";
import Tweetbox from "./Tweetbox";
import PageTitle from "./PageTitle";
import { UserContext } from "../App";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const context = useContext(UserContext);

  async function getTweets() {
    const tweetsCollecion = query(
      collection(db, "tweets"),
      orderBy("time", "desc")
    );
    const tweetsSnapshot = await getDocs(tweetsCollecion);
    setTweets(
      tweetsSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  }

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div className={styles.feed}>
      <PageTitle name="Home" />
      {context.user ? <Tweetbox getTweets={getTweets} /> : null}
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default Feed;
