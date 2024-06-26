"use client";

import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import { addTask } from "@/lib/tasks";

import ErrorBoundary from "@/ui/ErrorBoundary";
import NewTaskButton from "@/components/Tasks/NewTaskButton";

export default function NewForm() {
  const router = useRouter();
  const textAreaRef = useRef();
  const [charactersAmount, setCharactersAmount] = useState(0);
  const [state, formAction] = useFormState(addTask, { message: null });

  function checkCharactersHandle() {
    setCharactersAmount(textAreaRef.current.value.length);
  }

  function handleBack() {
    router.push("/tasks");
  }
  return (
    <>
      {state?.message && <ErrorBoundary>{state.message}</ErrorBoundary>}
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
          <NewTaskButton />
          <button type="button" className={styles.formBtn} onClick={handleBack}>
            Back
          </button>
        </form>
      </div>
    </>
  );
}
