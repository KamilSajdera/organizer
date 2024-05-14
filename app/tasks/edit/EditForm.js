"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import styles from "../new/page.module.scss";

import { editTask } from "@/lib/tasks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faArrowRight,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import NewTaskButton from "@/components/Tasks/NewTaskButton";
import ErrorBoundary from "@/ui/ErrorBoundary";

export default function EditForm({ taskData }) {
  const { id, title, description, date, priority } = taskData;

  const router = useRouter();
  const [charactersAmount, setCharactersAmount] = useState(description.length);
  const [state, formAction] = useFormState(editTask, { message: null });

  return (
    <section className={styles.newTask}>
      <header>
        <FontAwesomeIcon icon={faListCheck} /> Tasks
        <FontAwesomeIcon icon={faArrowRight} style={{ marginInline: "15px" }} />
        <FontAwesomeIcon icon={faPenToSquare} style={{ marginLeft: "0px" }} />
        Edit
      </header>
      {state?.message && <ErrorBoundary>{state.message}</ErrorBoundary>}
      <div className={styles["newTask_content"]}>
        <form action={formAction}>
          <div className={styles.inputBox}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={title}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="description">
              Description<h5>({charactersAmount}/300)</h5>
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={description}
              maxLength={300}
              onInput={(e) => setCharactersAmount(e.target.value.length)}
              required
            ></textarea>
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" name="date" defaultValue={date} />
          </div>
          <div className={styles.inputRadio}>
            <input
              type="radio"
              id="low"
              name="priority"
              value="low"
              defaultChecked={priority === "low"}
            />
            <label htmlFor="Low">Low</label>
          </div>
          <div className={styles.inputRadio}>
            <input
              type="radio"
              id="mid"
              name="priority"
              value="mid"
              defaultChecked={priority === "mid"}
            />
            <label htmlFor="mid">Mid</label>
          </div>
          <div className={styles.inputRadio}>
            <input
              type="radio"
              id="high"
              name="priority"
              value="high"
              defaultChecked={priority === "high"}
            />
            <label htmlFor="high">High</label>
          </div>
          <input
            type="text"
            name="id"
            value={id}
            style={{ display: "none" }}
            readOnly
          />
          <NewTaskButton />
          <button
            type="button"
            className={styles.formBtn}
            onClick={() => router.push("/tasks")}
          >
            Back
          </button>
        </form>
      </div>
    </section>
  );
}
