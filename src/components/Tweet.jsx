import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Tweet.module.css";
import TimeAgo from "react-timeago";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaBookmark, FaRegBookmark, FaTrashAlt } from "react-icons/fa";
import { UserContext } from "../App";
import { doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Tweet = ({ tweet }) => {
  const context = useContext(UserContext);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const isStillLike = useRef(false);
  const isStillBookmark = useRef(false);
  const tweetRef = useRef(null);

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

  async function bookmarkTweet() {
    if (!context?.user || isStillBookmark.current) return;
    isStillBookmark.current = true;

    try {
      const tweetsRef = doc(db, "tweets", tweet.id);
      let newBookmarks = [];

      if (bookmark) {
        newBookmarks = tweet.bookmarks.filter((e) => e != context?.user?.uid);
        await updateDoc(tweetsRef, { bookmarks: newBookmarks });
      } else {
        newBookmarks = [...tweet.bookmarks, context?.user?.uid];
        await updateDoc(tweetsRef, { bookmarks: newBookmarks });
      }

      tweet.bookmarks = newBookmarks;
      setBookmark((currentValue) => !currentValue);
    } catch (error) {
      console.log(error);
    }

    isStillBookmark.current = false;
  }

  async function deleteTweet() {
    if (tweet.uid != context?.user?.uid) return;
    await deleteDoc(doc(db, "tweets", tweet.id));
    tweetRef.current.remove();
  }

  useEffect(() => {
    setLike(tweet.likes?.includes(context?.user?.uid) ? true : false);
    setBookmark(tweet.bookmarks?.includes(context?.user?.uid) ? true : false);
  }, [context?.user]);

  return (
    <div className={styles.tweet} ref={tweetRef}>
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
            @{tweet.name.toLowerCase().replace(/\s+/g, "")} ·{" "}
            <TimeAgo date={tweet.time.seconds * 1000} />
          </span>
        </div>
        {tweet.text}
        {tweet.image && (
          <img src={tweet.image} alt="" className={styles.image} />
        )}
        <div className={styles.interaction}>
          {context?.user ? (
            <>
              <div className={styles.like} onClick={likeTweet}>
                {like ? <FcLike /> : <FcLikePlaceholder />}
                {tweet.likes?.length}
              </div>
              <div className={styles.bookmark} onClick={bookmarkTweet}>
                {bookmark ? <FaBookmark /> : <FaRegBookmark />}
              </div>
              {tweet.uid == context?.user?.uid ? (
                <div className={styles.delete} onClick={deleteTweet}>
                  <FaTrashAlt />
                </div>
              ) : null}
            </>
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
