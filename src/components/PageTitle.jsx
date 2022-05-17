import React from "react";
import styles from "./PageTitle.module.css";

const PageTitle = ({ name }) => {
  return (
    <a href="#" className={styles.home}>
      {name}
    </a>
  );
};

export default PageTitle;
