import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";
import Tweet from "../components/Tweet";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tweets, setTweets] = useState([]);

  async function getTweets() {
    try {
      const tweetsCollection = collection(db, "tweets");

      const tweetsSnapshot = await getDocs(tweetsCollection);
      const filteredTweets = tweetsSnapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter((tweet) =>
          tweet.text.toLowerCase().includes(searchParams.get("q").toLowerCase())
        )
        .sort((a, b) => (a.time < b.time ? 1 : -1));

      setTweets(filteredTweets);
    } catch (error) {
      console.log(error);
    }
  }

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
