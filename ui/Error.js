import styles from "./Error.module.scss";

export default function Error({ children }) {
  return <div className={styles.error}>{children}</div>;
}
