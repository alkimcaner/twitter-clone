import React from "react";
import styles from "./PageTitle.module.css";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const PageTitle = ({ Page }) => {
  return (
    <div className={styles.titlebar}>
      <Link to={-1} className={styles.back}>
        <IoArrowBack />
      </Link>
      <div className={styles.title}>{Page}</div>
    </div>
  );
};

export default PageTitle;
