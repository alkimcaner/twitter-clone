import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
//Firebase
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";
//Components
import Tweet from "../components/Tweet";
import PageTitle from "../components/PageTitle";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    try {
      const tweetsCollection = collection(db, "tweets");

      const tweetsSnapshot = await getDocs(tweetsCollection);
      const tweetsArray = tweetsSnapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((tweet) =>
          tweet.text.toLowerCase().includes(searchParams.get("q").toLowerCase())
        )
        .sort((a, b) => (a.time < b.time ? 1 : -1));

      setTweets(tweetsArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, [searchParams.get("q")]);

  return (
    <div>
      <PageTitle page={searchParams.get("q")} back={true} />
      {tweets.map((tweet) => (
        <Tweet key={Math.random()} tweet={tweet} />
      ))}
    </div>
  );
};

export default Search;
