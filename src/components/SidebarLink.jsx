import React from "react";
import styles from "./SidebarLink.module.css";
import { Link } from "react-router-dom";

const SidebarLink = ({ Path, Page, Icon }) => {
  return (
    <Link to={Path} className={styles.link}>
      <div className={styles.linkhighlight}>
        <Icon />
        <div className={styles.linklabel}>{Page}</div>
      </div>
    </Link>
  );
};

export default SidebarLink;
