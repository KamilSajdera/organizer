import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./goals-wrapper.module.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";

export default function GoalsWrapper({ goals, onCloseGoals }) {
  function handleClickClose() {
    onCloseGoals();
  }

  return (
    <div className={styles.goals}>
      <div className={styles["goals-container"]}>
        <h3>Your goals</h3>
        <FontAwesomeIcon
          icon={faClose}
          className={styles.closeSvg}
          onClick={handleClickClose}
        />
        {goals.map((item) => {
          const goalProgress = Math.round((item.collected / item.amount) * 100);
          const emojiColor =
            goalProgress <= 30
              ? "red"
              : goalProgress > 30 && goalProgress <= 70
              ? "yellow"
              : "green";

          const emojiSvg =
            goalProgress <= 30
              ? faFaceFrown
              : goalProgress > 30 && goalProgress <= 70
              ? faFaceMeh
              : faFaceSmile;

          return (
            <div className={styles["goal-item"]} key={item._id}>
              <h4>{item.title}</h4>
              <div className={styles["goal-item__details"]}>
                <div className={styles["goal-item__details-pos"]}>
                  Paid <b>{item.collected}$</b>
                </div>
                <div className={styles["goal-item__details-pos"]}>
                  Total <b>{item.amount}$</b>
                </div>
              </div>
              <div className={styles["goal-progress_bar"]}>
                <div
                  className={styles["goal-user_progress"]}
                  style={{ width: `${goalProgress}%` }}
                ></div>
              </div>
              <p className={styles["goal-progress_percent"]}>
                {goalProgress}%{" "}
                <FontAwesomeIcon
                  icon={emojiSvg}
                  className={styles.emoji}
                  style={{ color: emojiColor }}
                />
              </p>
              <button className={styles["deposit-btn"]}>Deposit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
