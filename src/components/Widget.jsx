import React from "react";

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
    </div>
  );
};

export default Widget;
