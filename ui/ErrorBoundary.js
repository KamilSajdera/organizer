import styles from "./ErrorBoundary.module.scss";

export default function ErrorBoundary({ children }) {
  return <div className={styles.error}>{children}</div>;
}
