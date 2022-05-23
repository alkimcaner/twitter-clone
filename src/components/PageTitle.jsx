import React from "react";
import styles from "./PageTitle.module.css";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const PageTitle = ({ page, back }) => {
  return (
    <div className={styles.titlebar}>
      {back ? (
        <Link to={-1} className={styles.back}>
          <IoArrowBack />
        </Link>
      ) : null}

      <div className={styles.title}>{page}</div>
    </div>
  );
};

export default PageTitle;
