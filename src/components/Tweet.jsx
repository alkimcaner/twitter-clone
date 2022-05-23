import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Tweet.module.css";
import TimeAgo from "react-timeago";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { UserContext } from "../App";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Tweet = ({ tweet }) => {
  const context = useContext(UserContext);
  const [like, setLike] = useState(false);
  const isStillLike = useRef(false);

  async function likeTweet() {
    if (!context?.user || isStillLike.current) return;
    isStillLike.current = true;

    try {
      const tweetsRef = doc(db, "tweets", tweet.id);
      let newLikes = [];

      if (like) {
        newLikes = tweet.likes.filter((e) => e != context?.user?.uid);
        await updateDoc(tweetsRef, { likes: newLikes });
      } else {
        newLikes = [...tweet.likes, context?.user?.uid];
        await updateDoc(tweetsRef, { likes: newLikes });
      }

      tweet.likes = newLikes;
      setLike((currentValue) => !currentValue);
    } catch (error) {
      console.log(error);
    }

    isStillLike.current = false;
  }

  useEffect(() => {
    setLike(tweet.likes?.includes(context?.user?.uid) ? true : false);
  }, []);

  return (
    <div className={styles.tweet}>
      <div>
        <Link to={`/user/${tweet.uid}`}>
          <img src={tweet.userPhoto} alt="avatar" className="profileicon" />
        </Link>
      </div>

      <div className={styles.content}>
        <div>
          <Link to={`/user/${tweet.uid}`} className={styles.user}>
            {tweet.name}
          </Link>
          <span className={styles.username}>
            @{tweet.name} · <TimeAgo date={tweet.time.seconds * 1000} />
          </span>
        </div>
        {tweet.text}
        {tweet.image && (
          <img src={tweet.image} alt="" className={styles.image} />
        )}
        <div className={styles.interaction}>
          {context?.user ? (
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
