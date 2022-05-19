import React from "react";
import styles from "./SidebarLink.module.css";

const SidebarLink = ({ Link, Icon }) => {
  return (
    <div className={styles.link}>
      <div className={styles.linkhighlight}>
        <Icon />
        <div className={styles.linklabel}>{Link}</div>
      </div>
    </div>
  );
};

export default SidebarLink;
