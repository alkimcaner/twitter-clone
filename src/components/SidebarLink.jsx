import React from "react";
import styles from "./SidebarLink.module.css";
import { Link } from "react-router-dom";

const SidebarLink = ({ path, page, Icon }) => {
  return (
    <Link to={path} className={styles.link}>
      <div className={styles.linkhighlight}>
        <Icon />
        <div className={styles.linklabel}>{page}</div>
      </div>
    </Link>
  );
};

export default SidebarLink;
