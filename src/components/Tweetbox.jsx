import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../App";
import styles from "./Tweetbox.module.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore/lite";
import { FaPhotoVideo } from "react-icons/fa";

const Tweetbox = ({ getTweets }) => {
  const [showImageInput, setShowImageInput] = useState(false);
  const context = useContext(UserContext);
  const TweetText = useRef(null);
  const ImageURL = useRef(null);

  function toggleImageInput() {
    setShowImageInput((currentValue) => !currentValue);
  }

  async function sendTweet(event) {
    event.preventDefault();
    if (!context.user) return;

    const tweet = {
      username: context.user.displayName,
      userPhoto: context.user.photoURL,
      uid: context.user.uid,
      text: TweetText.current?.value,
      image: ImageURL.current?.value || "",
      time: Timestamp.now().toDate(),
      likes: [],
    };

    try {
      await addDoc(collection(db, "tweets"), tweet);
      getTweets();
      TweetText.current.value = "";
      ImageURL.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={styles.tweetbox} onSubmit={sendTweet}>
      <img
        src={context.user.photoURL}
        alt="profilePhoto"
        className="profileicon"
      />
      <div className={styles.tweet}>
        <textarea
          type="text"
          placeholder="What's happening?"
          className={styles.input}
          ref={TweetText}
          required
        />

        <div className={styles.send}>
          <div className={styles.media}>
            <div className={styles.mediaicon} onClick={toggleImageInput}>
              <FaPhotoVideo />
            </div>
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
