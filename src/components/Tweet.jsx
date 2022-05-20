import React, { useContext, useEffect, useState } from "react";
import styles from "./Tweet.module.css";
import TimeAgo from "react-timeago";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { UserContext } from "../App";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase";

const Tweet = ({ tweet, getTweets }) => {
  const context = useContext(UserContext);
  const [like, setLike] = useState(false);

  async function likeTweet() {
    const tweetsRef = doc(db, "tweets", tweet.id);
    if (like) {
      await updateDoc(tweetsRef, {
        likes: tweet.likes.filter((e) => e != context.user?.uid),
      });
    } else {
      await updateDoc(tweetsRef, {
        likes: [...tweet.likes, context.user?.uid],
      });
    }
    setLike((currentValue) => !currentValue);
    getTweets();
  }

  useEffect(() => {
    setLike(tweet.likes?.includes(context.user?.uid) ? true : false);
  }, []);

  return (
    <div className={styles.tweet}>
      <img src={tweet.userPhoto} alt="profilePhoto" className="profileicon" />
      <div className={styles.content}>
        <div>
          <a href="#" className={styles.user}>
            {tweet.username}
          </a>
          <span className={styles.username}>
            @{tweet.username} ·{" "}
            <TimeAgo date={new Date(tweet.time.seconds * 1000)} />
          </span>
        </div>
        {tweet.text}
        {tweet.image && (
          <img src={tweet.image} alt="" className={styles.image} />
        )}
        <div className={styles.interaction}>
          {context.user ? (
            <div className={styles.like} onClick={likeTweet}>
              {like ? <FcLike /> : <FcLikePlaceholder />}
              {tweet.likes?.length}
            </div>
          ) : (
            <div className={styles.like}>
              <FcLike />
              {tweet.likes?.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
