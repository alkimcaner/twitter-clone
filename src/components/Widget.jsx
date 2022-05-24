import React, { useRef } from "react";
import styles from "./Widget.module.css";
import { useNavigate } from "react-router-dom";

const Widget = () => {
  const navigate = useNavigate();
  const searchInput = useRef(null);

  async function searchTweets(event) {
    event.preventDefault();
    navigate(`/search?q=${searchInput.current.value}`, { replace: true });
  }

  return (
    <div className={styles.widget}>
      <form className={styles.search} onSubmit={searchTweets}>
        <input
          type="text"
          placeholder="Search Twitter"
          className={styles.input}
          ref={searchInput}
          required
        />
      </form>
    </div>
  );
};

export default Widget;
