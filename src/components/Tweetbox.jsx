import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../App";
import styles from "./Tweetbox.module.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore/lite";
import MediaIcon from "../assets/Icons/media.svg";

const Tweetbox = ({ getTweets }) => {
  const [showImageInput, setShowImageInput] = useState(false);
  const context = useContext(UserContext);
  const ImageURL = useRef(null);
  const TweetText = useRef(null);

  function toggleImageInput() {
    setShowImageInput((currentValue) => {
      return !currentValue;
    });
  }

  async function sendTweet(event) {
    event.preventDefault();
    const tweet = {
      username: context.user.displayName,
      userPhoto: context.user.photoURL,
      text: TweetText.current?.value,
      image: ImageURL.current?.value || "",
      time: Timestamp.now().toDate(),
    };

    await addDoc(collection(db, "tweets"), tweet);
    getTweets();
  }

  return (
    <form className={styles.tweetbox} onSubmit={sendTweet}>
      <img
        src={context.user.photoURL}
        alt="profilePhoto"
        className="profileicon"
      />
      <div className={styles.tweet}>
        <input
          type="text"
          placeholder="What's happening?"
          className={styles.input}
          ref={TweetText}
          required
        />

        <div className={styles.send}>
          <div className={styles.media}>
            <img
              src={MediaIcon}
              alt=""
              className={styles.mediaicon}
              onClick={toggleImageInput}
            />
            {showImageInput ? (
              <input
                type="url"
                placeholder="Image URL"
                ref={ImageURL}
                required
              ></input>
            ) : null}
          </div>
          <input type="submit" className="btn" value="Tweet" />
        </div>
      </div>
    </form>
  );
};

export default Tweetbox;
