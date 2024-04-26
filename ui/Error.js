import styles from "./Error.module.scss";

export default function Error({message}) {
  return <div className={styles.error}>Something went wrong!</div>;
}
