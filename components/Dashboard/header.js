import styles from "./header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

export default function Header({ name }) {
  return (
    <header className={styles.header}>
      <h1>
        Hi, <span className={styles.name}>{name}</span>!
      </h1>
      <p className={styles.lastVisited}>
        <FontAwesomeIcon icon={faFlag} /> Last logged:{" "}
        <span className={styles.date}>20/10/2024 I 20:13:57</span>
      </p>
    </header>
  );
}
