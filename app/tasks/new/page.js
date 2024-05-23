import styles from "./page.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faArrowRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import NewForm from "./NewForm";

export const metadata = {
  title: "New task | Manageo - personal assistant"
};

export default function NewTask() {
  return (
    <section className={styles.newTask}>
      <header>
        <FontAwesomeIcon icon={faListCheck} /> Tasks
        <FontAwesomeIcon icon={faArrowRight} style={{ marginInline: "15px" }} />
        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: "0px" }} />
        New
      </header>
      <NewForm />
    </section>
  );
}
