import React from "react";
import styles from "./Tweet.module.css";
import ProfileIcon from "../assets/Icons/avatar.svg";

const Tweet = ({ tweet }) => {
  return (
    <div className={styles.tweet}>
      <img src={ProfileIcon} alt="" className="profileicon" />
      <div className={styles.content}>
        <div>
          <a href="#" className={styles.user}>
            {tweet.username}
          </a>
          <span className={styles.username}>@{tweet.username}</span>
        </div>
        {tweet.text}
        {tweet.image && (
          <img src={tweet.image} alt="media" className={styles.image} />
        )}
      </div>
    </div>
  );
};

export default Tweet;
