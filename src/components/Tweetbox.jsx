import React from "react";
import styles from "./Tweetbox.module.css";
import ProfileIcon from "../assets/Icons/avatar.svg";
import MediaIcon from "../assets/Icons/media.svg";

const Tweetbox = () => {
  return (
    <div className={styles.tweetbox}>
      <img src={ProfileIcon} alt="" className="profileicon" />
      <div className={styles.tweet}>
        <input
          type="text"
          placeholder="What's happening?"
          className={styles.input}
        />

        <div className={styles.send}>
          <div className={styles.media}>
            <img src={MediaIcon} alt="" className={styles.mediaicon} />
          </div>
          <button className="btn">Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Tweetbox;
