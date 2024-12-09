import styles from "./header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

export default function Header({ name, last_logged }) {
  const formattedDate = last_logged?.toLocaleDateString("pl-PL") ;
  const formattedTime = last_logged?.toLocaleTimeString("pl-PL", {
    hour12: false,
  });

  const result = `${formattedDate} I ${formattedTime}`;
  
  return (
    <header className={styles.header}>
      <h1>
        Hi, <span className={styles.name}>{name}</span>!
      </h1>
      <p className={styles.lastVisited}>
        <FontAwesomeIcon icon={faFlag} /> Last logged:{" "}
        <span className={styles.date}>{result}</span>
      </p>
    </header>
  );
}
