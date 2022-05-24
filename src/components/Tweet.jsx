import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Tweet.module.css";
import TimeAgo from "react-timeago";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import {
  FaBookmark,
  FaRegBookmark,
  FaTrashAlt,
  FaComments,
  FaReply,
} from "react-icons/fa";
import { RiMoreFill } from "react-icons/ri";
import { UserContext } from "../App";
import { doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Tweet = ({ tweet }) => {
  const context = useContext(UserContext);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [tweetMenu, setTweetMenu] = useState(false);
  const [tweetState, setTweetState] = useState({});
  const isStillLike = useRef(false);
  const isStillBookmark = useRef(false);

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
    setTweetState(null);
  }

  useEffect(() => {
    setTweetState(tweet);
    setLike(tweet.likes?.includes(context?.user?.uid) ? true : false);
    setBookmark(tweet.bookmarks?.includes(context?.user?.uid) ? true : false);
  }, [context?.user]);

  return (
    tweetState && (
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
              @{tweet.name?.toLowerCase().replace(/\s+/g, "")} ·{" "}
              <TimeAgo date={tweet.time?.seconds * 1000 || Date.now()} />
            </span>
          </div>
          {tweet.parentTweet != "" && (
            <div>
              <Link
                to={`/comments/${tweet.parentTweet}`}
                className={styles.reply}
              >
                <FaReply /> Reply
              </Link>
            </div>
          )}
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
                <Link to={`/comments/${tweet.id}`} className={styles.comment}>
                  <FaComments />
                </Link>
                <div className={styles.bookmark} onClick={bookmarkTweet}>
                  {bookmark ? <FaBookmark /> : <FaRegBookmark />}
                </div>
              </>
            ) : (
              <div className={styles.like}>
                <FcLike />
                {tweet.likes?.length}
              </div>
            )}
          </div>
        </div>
        {tweet.uid == context?.user?.uid && (
          <div>
            <div
              className={styles.more}
              onClick={() => setTweetMenu((currentValue) => !currentValue)}
            >
              <RiMoreFill />
              {tweetMenu && (
                <div className={styles.delete} onClick={deleteTweet}>
                  <FaTrashAlt /> Delete tweet
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Tweet;
