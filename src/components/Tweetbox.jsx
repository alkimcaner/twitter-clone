import React from "react";
import ProfileIcon from "../assets/Icons/avatar.svg";
import MediaIcon from "../assets/Icons/media.svg";

const Tweetbox = () => {
  return (
    <div className="feed__tweetbox">
      <img src={ProfileIcon} alt="" className="profileicon" />
      <div className="feed__tweetbox__tweet">
        <input
          type="text"
          placeholder="What's happening?"
          className="feed__tweetbox__tweet__input"
        />

        <div className="feed__tweetbox__tweet__send">
          <div className="feed__tweetbox__tweet__send__media">
            <img
              src={MediaIcon}
              alt=""
              className="feed__tweetbox__tweet__send__media__icon"
            />
          </div>
          <button className="btn">Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Tweetbox;
