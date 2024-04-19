import Link from "next/link";
import styles from "./PageHeader.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function PageHeader({ title, href }) {
  return (
    <header className={styles.header}>
      <h1>{title} View</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </form>
      <div className={styles["add-button"]}>
        <Link href={`${href}/new`}>+</Link>
      </div>
    </header>
  );
}
