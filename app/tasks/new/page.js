"use client";

import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import styles from "./page.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faArrowRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { addTask } from "@/lib/tasks";

import Error from "@/ui/Error";

export default function NewTask() {
  const textAreaRef = useRef();
  const [charactersAmount, setCharactersAmount] = useState(0);
  const [state, formAction] = useFormState(addTask, { message: null });

  function checkCharactersHandle() {
    setCharactersAmount(textAreaRef.current.value.length);
  }

  return (
    <section className={styles.newTask}>
      <header>
        <FontAwesomeIcon icon={faListCheck} /> Tasks
        <FontAwesomeIcon icon={faArrowRight} style={{ marginInline: "15px" }} />
        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: "0px" }} />
        New
      </header>
      {state?.message && <Error>{state.message}</Error>}
      <div className={styles["newTask_content"]}>
        <form action={formAction}>
          <div className={styles.inputBox}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="description">
              Description<h5>({charactersAmount}/300)</h5>
            </label>
            <textarea
              id="description"
              name="description"
              maxLength={300}
              onInput={checkCharactersHandle}
              ref={textAreaRef}
              required
            ></textarea>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" />
          </div>
          <div className={styles.inputRadio}>
            <input type="radio" id="low" name="priority" value="low" />
            <label htmlFor="Low">Low</label>
          </div>
          <div className={styles.inputRadio}>
            <input type="radio" id="mid" name="priority" value="mid" />
            <label htmlFor="mid">Mid</label>
          </div>
          <div className={styles.inputRadio}>
            <input type="radio" id="high" name="priority" value="high" />
            <label htmlFor="high">High</label>
          </div>
          <button type="submit" className={styles.formBtn}>
            Save
          </button>
          <button type="button" className={styles.formBtn}>
            Back
          </button>
        </form>
      </div>
    </section>
  );
}
