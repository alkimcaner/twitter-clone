import React from "react";
import styles from "./Tweet.module.css";
import TimeAgo from "react-timeago";

const Tweet = ({ tweet }) => {
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
      </div>
    </div>
  );
};

export default Tweet;
