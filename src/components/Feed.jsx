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
    const tweetsCollection = collection(db, "tweets");
    const orderedCollecion = query(tweetsCollection, orderBy("time", "desc"));
    const tweetsSnapshot = await getDocs(orderedCollecion);
    setTweets(tweetsSnapshot.docs.map((doc) => doc.data()));
  }

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div className={styles.feed}>
      <PageTitle name="Home" />
      {context.user ? <Tweetbox /> : null}
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default Feed;
