import React from "react";
import ProfileIcon from "../Icons/avatar.svg";
import MediaIcon from "../Icons/media.svg";

const Tweetbox = () => {
  return (
    <div className="tweetbox">
      <img src={ProfileIcon} alt="" className="profileicon" />
      <div className="tweetinput">
        <div className="tweetinput__box"></div>
        <input
          type="text"
          placeholder="What's happening?"
          className="tweetinput__box--input"
        />
        <div className="tweetsend">
          <div className="tweetsend__media">
            <img src={MediaIcon} alt="" />
          </div>
          <button className="btn">Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Tweetbox;
