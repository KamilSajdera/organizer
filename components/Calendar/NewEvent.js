import styles from "./NewEvent.module.scss";

export default function NewEvent() {
  return (
    <div className={styles.overlay}>
      <div className={styles["newEvent-modal"]}>
        <h2>New event</h2>
        <h4>21.07.2024</h4>
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
              <input type="checkbox" id={styles["all_day_input"]} />
              <i></i>
            </label>
          </div>
          <div className={styles["hours-con"]}>
            <div className={styles["hour-item"]}>
              <input type="time" name="hour" step="1800"/>
              <p>Start</p>
            </div>
            -
            <div className={styles["hour-item"]}>
              <input type="time" name="hour" step="1800"/>
              <p>End</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
