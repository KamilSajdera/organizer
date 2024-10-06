import { useState, useRef, useTransition, useEffect } from "react";
import styles from "./goals-wrapper.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";

import { updateGoal } from "@/lib/expenses";

export default function GoalsWrapper({ goals, onCloseGoals, userId }) {
  const [depositGoalId, setDepositGoalId] = useState(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef();

  function handleClickClose() {
    onCloseGoals();
  }

  const handleUpdateGoal = () => {
    startTransition(async () => {
      await updateGoal(userId, depositGoalId, inputRef.current.value);
    });
  };

  useEffect(() => {
    if (!isPending) setDepositGoalId(null);
  }, [isPending]);

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
              ? "#8d4949"
              : goalProgress > 30 && goalProgress <= 70
              ? "#818d49"
              : "#498d53";

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
              <div className={styles.deposit}>
                <button
                  className={styles["deposit-btn"]}
                  onClick={() => setDepositGoalId(item._id)}
                >
                  Deposit
                </button>
                {depositGoalId === item._id && (
                  <div className={styles["deposit-input"]}>
                    {isPending ? (
                      <span className={styles.loadingText}>loading</span>
                    ) : (
                      <>
                        <input type="number" required ref={inputRef} />
                        <button
                          className={styles["deposit-submit"]}
                          onClick={handleUpdateGoal}
                        >
                          GO
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
