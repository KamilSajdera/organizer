import styles from "./ErrorBlock.module.scss";

export default function ErrorBlock({ message }) {
  return <div className={styles.error}>{message}</div>;
}
