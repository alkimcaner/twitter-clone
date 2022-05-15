import React from "react";
import Tweet from "./Tweet";
import Tweetbox from "./Tweetbox";

const Feed = () => {
  return (
    <div className="feed">
      <a href="#" className="feed__home">
        Home
      </a>
      <Tweetbox />
      <Tweet />
    </div>
  );
};

export default Feed;
