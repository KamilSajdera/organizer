import { useState } from "react";
import styles from "./mobile-navigation.module.scss";

export default function MobileNavigation({ onChangeCategory }) {
  const [category, setCategory] = useState(1);

  function handleChangeCategory(value) {
    onChangeCategory(value);
    setCategory(value);
  }

  return (
    <div className={styles["mobile-navbar"]}>
      <div
        className={`${styles["mobile-navbar-item"]} ${
          category === 1 ? styles.active : ""
        }`}
        onClick={() => handleChangeCategory(1)}
      >
        ToDo
      </div>
      <div
        className={`${styles["mobile-navbar-item"]} ${
          category === 2 ? styles.active : ""
        }`}
        onClick={() => handleChangeCategory(2)}
      >
        In Progress
      </div>
      <div
        className={`${styles["mobile-navbar-item"]} ${
          category === 3 ? styles.active : ""
        }`}
        onClick={() => handleChangeCategory(3)}
      >
        Done
      </div>
    </div>
  );
}
