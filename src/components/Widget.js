import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widget = () => {
  return (
    <div className="widget">
      <div className="widget__search">
        <input
          type="text"
          placeholder="Search Twitter"
          className="widget__search__input"
        />
      </div>
      <div className="widget__timeline">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 800 }}
        />
      </div>
    </div>
  );
};

export default Widget;
