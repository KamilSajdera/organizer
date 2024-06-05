import { useState } from "react";

import styles from "./NewEvent.module.scss";

export default function NewEvent({ date, onClose }) {
  const eventWithHours = date.includes("T");
  const [isDisableHours, setIsDisableHours] = useState(!eventWithHours);

  let formatedDate = new Date(date);

  let eventHour = eventWithHours
    ? formatedDate.getHours() <= 9
      ? `0${formatedDate.getHours()}`
      : formatedDate.getHours()
    : null;

  let eventMinutes = eventWithHours
    ? formatedDate.getMinutes() <= 9
      ? `0${formatedDate.getMinutes()}`
      : formatedDate.getMinutes()
    : null;

  function handleChangeAllDay(e) {
    const isChecked = e.target.checked;

    if (isChecked) setIsDisableHours(true);
    else setIsDisableHours(false);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles["newEvent-modal"]}>
        <h2>New event</h2>
        <h4>
          {formatedDate.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </h4>
        <form className={styles["newEvent-modal_form"]}>
          <div className={styles.inputBox}>
            <input type="text" id="title" name="title" required minLength={1} />
            <label htmlFor="title">Title</label>
          </div>
          <div className={styles.inputBox}>
            <textarea
              id="description"
              name="description"
              required
              minLength={1}
            />
            <label htmlFor="description">Description</label>
          </div>
          <div className={styles["all-day"]}>
            <label className={styles["form-switch"]}>
              All Day
              <input
                type="checkbox"
                id={styles["all_day_input"]}
                onChange={handleChangeAllDay}
                defaultChecked={!eventWithHours}
              />
              <i></i>
            </label>
          </div>
          <div className={styles["hours-con"]}>
            <div
              className={`${styles["hour-item"]} ${
                isDisableHours && styles.disabled
              }`}
            >
              <input
                type="time"
                name="hour"
                step="1800"
                defaultValue={`${eventHour}:${eventMinutes}`}
                disabled={isDisableHours}
              />
              <p>Start</p>
            </div>
            -
            <div
              className={`${styles["hour-item"]} ${
                isDisableHours && styles.disabled
              }`}
            >
              <input
                type="time"
                name="hour"
                step="1800"
                disabled={isDisableHours}
              />
              <p>End</p>
            </div>
          </div>
          <button type="button" className={styles.button} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles["button-save"]}`}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
