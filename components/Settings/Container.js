
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";

import styles from "./Container.module.scss";

import ImagePicker from './ImagePicker';
import ItemInput from "./ItemInput";
import Controls from "./Controls";

export default function Container() {
  return (
    <>
      <header className={styles.header}>
        <FontAwesomeIcon icon={faGears} />
        User settings
      </header>
      <ImagePicker />
      <section className={styles['user-data']}>
        <ItemInput label="Nickname" value="osoba1" />
        <ItemInput label="Email" value="example1@email.net" />
      </section>
      <Controls />
    </>
  );
}
