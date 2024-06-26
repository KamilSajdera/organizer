import { useState, useEffect } from "react";
import { useFormState } from "react-dom";

import styles from "./NewEvent.module.scss";

import { sendEvent } from "@/lib/events";
import NewEventSubmit from "./NewEventSubmit";
import ErrorBoundary from "@/ui/ErrorBoundary";

export default function NewEvent({ date, onClose, userId }) {
  const eventWithHours = date.includes("T");
  const [isDisableHours, setIsDisableHours] = useState(!eventWithHours);
  const [state, formAction] = useFormState(sendEvent.bind(null, userId), null);

  useEffect(() => {
    if (state?.success) onClose();
  }, [state]);

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
        {state?.success === false && <ErrorBoundary>{state?.errorMessage}</ErrorBoundary>}
        <form className={styles["newEvent-modal_form"]} action={formAction}>
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
                name='all-day'
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
              <p>Start</p>
              <input
                type="time"
                name="start-hour"
                defaultValue={`${eventHour}:${eventMinutes}`}
                disabled={isDisableHours}
                required={!eventWithHours}
              />
            </div>
            <p>End</p>
            <div
              className={`${styles["hour-item"]} ${
                isDisableHours && styles.disabled
              }`}
            >
              <input
                type="datetime-local"
                name="end"
                disabled={isDisableHours}
              />
            </div>
          </div>
          <input
            type="text"
            readOnly
            style={{ display: "none" }}
            value={date}
            name="date"
          />
          <button type="button" className={styles.button} onClick={onClose}>
            Cancel
          </button>
          <NewEventSubmit />
        </form>
      </div>
    </div>
  );
}
