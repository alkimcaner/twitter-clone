import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//Firebase
import { db } from "../firebase";
import { getDocs, collection, where, query } from "firebase/firestore/lite";
//Components
import Tweet from "../components/Tweet";

const UserReplies = () => {
  const params = useParams();
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    try {
      const tweetsCollection = query(
        collection(db, "tweets"),
        where("uid", "==", params.id)
      );
      const tweetsSnapshot = await getDocs(tweetsCollection);
      const tweetsArray = tweetsSnapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((e) => e.parentTweet != "")
        .sort((a, b) => (a.time < b.time ? 1 : -1));

      setTweets(tweetsArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, [params.id]);

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default UserReplies;
