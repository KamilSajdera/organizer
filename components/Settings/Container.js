
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";

import styles from "./Container.module.scss";

import ImagePicker from './ImagePicker';

export default function Container() {
  return (
    <>
      <header className={styles.header}>
        <FontAwesomeIcon icon={faGears} />
        User settings
      </header>
      <ImagePicker />
    </>
  );
}
