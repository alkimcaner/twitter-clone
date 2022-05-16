import React from "react";
import ProfileIcon from "../Icons/avatar.svg";

const Tweet = ({ tweet }) => {
  return (
    <div className="feed__tweet">
      <img src={ProfileIcon} alt="" className="profileicon" />
      <div className="feed__tweet__content">
        <div>
          <a href="#" className="feed__tweet__content__user">
            {tweet.username}
          </a>
          <span className="feed__tweet__content__username">
            @{tweet.username}
          </span>
        </div>
        <span>{tweet.text}</span>
      </div>
    </div>
  );
};

export default Tweet;
