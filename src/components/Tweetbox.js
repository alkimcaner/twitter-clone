import React from "react";
import ProfileIcon from "../Icons/avatar.svg";
import MediaIcon from "../Icons/media.svg";

const Tweetbox = () => {
  return (
    <div className="feed__tweetbox">
      <img src={ProfileIcon} alt="" className="feed__tweetbox__profileicon" />
      <div className="tweetinput">
        <input
          type="text"
          placeholder="What's happening?"
          className="tweetinput__input"
        />

        <div className="tweetsend">
          <div className="tweetsend__media">
            <img src={MediaIcon} alt="" className="tweetsend__media__icon" />
          </div>
          <button className="btn">Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Tweetbox;
