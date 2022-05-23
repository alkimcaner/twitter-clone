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
    if (!context?.user) return;

    const tweet = {
      uid: context?.user.uid,
      name: context?.user.displayName,
      userPhoto: context?.user.photoURL,
      text: TweetText.current?.value,
      image: ImageURL.current?.value || "",
      time: Timestamp.now().toDate(),
      likes: [],
      bookmarks: [],
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
      <img src={context?.user.photoURL} alt="avatar" className="profileicon" />
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
                className={styles.imageinput}
                ref={ImageURL}
                required
              ></input>
            ) : null}
          </div>
          <input type="submit" className={styles.btn} value="Tweet" />
        </div>
      </div>
    </form>
  );
};

export default Tweetbox;
