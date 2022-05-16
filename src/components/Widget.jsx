import React from "react";
import styles from "./Widget.module.css";

const Widget = () => {
  return (
    <div className={styles.widget}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search Twitter"
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default Widget;
