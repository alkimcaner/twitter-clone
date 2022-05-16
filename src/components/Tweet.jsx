import React from "react";
import ProfileIcon from "../assets/Icons/avatar.svg";

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
        {tweet.text}
        {tweet.image && (
          <img
            src={tweet.image}
            alt="media"
            className="feed__tweet__content__image"
          />
        )}
      </div>
    </div>
  );
};

export default Tweet;
