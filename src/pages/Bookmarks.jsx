import React, { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
//Firebase
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore/lite";
//Components
import Tweet from "../components/Tweet";
import PageTitle from "../components/PageTitle";

const Bookmarks = () => {
  const context = useContext(UserContext);
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    try {
      const tweetsCollection = query(
        collection(db, "tweets"),
        where("bookmarks", "array-contains", context?.user?.uid || false)
      );
      const tweetsSnapshot = await getDocs(tweetsCollection);
      const tweetsArray = tweetsSnapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .sort((a, b) => (a.time < b.time ? 1 : -1));

      setTweets(tweetsArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, [context?.user]);

  return (
    <div>
      <PageTitle page="Bookmarks" back={false} />
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default Bookmarks;
