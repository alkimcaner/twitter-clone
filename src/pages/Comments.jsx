import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { useParams } from "react-router-dom";
//Firebase
import { db } from "../firebase";
import {
  getDocs,
  getDoc,
  doc,
  query,
  collection,
  where,
} from "firebase/firestore/lite";
//Components
import Tweetbox from "../components/Tweetbox";
import Tweet from "../components/Tweet";
import PageTitle from "../components/PageTitle";

const Comments = () => {
  const context = useContext(UserContext);
  const params = useParams();
  const [parentTweet, setParentTweet] = useState({});
  const [comments, setComments] = useState([]);

  const getParentTweet = async () => {
    try {
      const parentTweetDoc = await getDoc(doc(db, "tweets", params.id));
      setParentTweet({ ...parentTweetDoc.data(), id: parentTweetDoc.id });
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const tweetsCollection = query(
        collection(db, "tweets"),
        where("parentTweet", "==", params.id)
      );
      const tweetsSnapshot = await getDocs(tweetsCollection);
      const tweetsArray = tweetsSnapshot.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .sort((a, b) => (a.time < b.time ? 1 : -1));

      setComments(tweetsArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getParentTweet();
    getComments();
  }, [context?.user, params.id]);

  return (
    <div>
      <PageTitle page="Comments" back={true} />
      {parentTweet.uid ? (
        <>
          <Tweet tweet={parentTweet} />
          {context?.user && (
            <Tweetbox getTweets={getComments} parentTweet={params.id} />
          )}
          {comments.map((tweet) => (
            <Tweet key={Math.random()} tweet={tweet} />
          ))}
        </>
      ) : (
        <div>Invalid page</div>
      )}
    </div>
  );
};

export default Comments;
