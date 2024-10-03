import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./goals-wrapper.module.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function GoalsWrapper({onCloseGoals}) {

  function handleClickClose() {
    onCloseGoals();
  }

  return (
    <div className={styles.goals}>
      <div className={styles["goals-container"]}>
        <h3>Your goals</h3>
        <FontAwesomeIcon icon={faClose} onClick={handleClickClose}/>
        <div className={styles["goal-item"]}>
          <h4>Title of your goal da d1d21 a 2d1 da deadea</h4>
          <div className={styles["goal-item__details"]}>
            <div className={styles["goal-item__details-pos"]}>
              Paid <b>30$</b>
            </div>
            <div className={styles["goal-item__details-pos"]}>
              Total <b>100$</b>
            </div>
          </div>
          <div className={styles["goal-progress_bar"]}>
            <div className={styles["goal-user_progress"]}></div>
          </div>
          <p className={styles["goal-progress_percent"]}>30%</p>
          <button className={styles["deposit-btn"]}>Deposit</button>
        </div>
        <div className={styles["goal-item"]}>
          <h4>Title goal</h4>
          <div className={styles["goal-item__details"]}>
            <div className={styles["goal-item__details-pos"]}>
              Paid <b>45$</b>
            </div>
            <div className={styles["goal-item__details-pos"]}>
              Total <b>123$</b>
            </div>
          </div>
          <div className={styles["goal-progress_bar"]}>
            <div className={styles["goal-user_progress"]}></div>
          </div>
          <p className={styles["goal-progress_percent"]}>50%</p>
          <button className={styles["deposit-btn"]}>Deposit</button>
        </div>
        <div className={styles["goal-item"]}>
          <h4>Title of your goal</h4>
          <div className={styles["goal-item__details"]}>
            <div className={styles["goal-item__details-pos"]}>
              Paid <b>30$</b>
            </div>
            <div className={styles["goal-item__details-pos"]}>
              Total <b>100$</b>
            </div>
          </div>
          <div className={styles["goal-progress_bar"]}>
            <div className={styles["goal-user_progress"]}></div>
          </div>
          <p className={styles["goal-progress_percent"]}>30%</p>
          <button className={styles["deposit-btn"]}>Deposit</button>
        </div>
        <div className={styles["goal-item"]}>
          <h4>Title of your goal</h4>
          <div className={styles["goal-item__details"]}>
            <div className={styles["goal-item__details-pos"]}>
              Paid <b>30$</b>
            </div>
            <div className={styles["goal-item__details-pos"]}>
              Total <b>100$</b>
            </div>
          </div>
          <div className={styles["goal-progress_bar"]}>
            <div className={styles["goal-user_progress"]}></div>
          </div>
          <p className={styles["goal-progress_percent"]}>30%</p>
          <button className={styles["deposit-btn"]}>Deposit</button>
        </div>
        <div className={styles["goal-item"]}>
          <h4>Title of your goal</h4>
          <div className={styles["goal-item__details"]}>
            <div className={styles["goal-item__details-pos"]}>
              Paid <b>30$</b>
            </div>
            <div className={styles["goal-item__details-pos"]}>
              Total <b>100$</b>
            </div>
          </div>
          <div className={styles["goal-progress_bar"]}>
            <div className={styles["goal-user_progress"]}></div>
          </div>
          <p className={styles["goal-progress_percent"]}>30%</p>
          <button className={styles["deposit-btn"]}>Deposit</button>
        </div>
      </div>
    </div>
  );
}
