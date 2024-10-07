import { useFormState } from "react-dom";
import { addGoal } from "@/lib/expenses";

import Button from "./AddButton";
import ErrorBlock from "../AuthPage/ErrorBlock";

import styles from "./AddExpenseModal.module.scss";

export default function AddGoalModal({ onCloseGoalModal, userId }) {
  const [state, formAction] = useFormState(addGoal.bind(null, userId), null);

  if (state?.success) {
    onCloseGoalModal();
  }

  return (
    <div className={styles["addExpense-overlay"]}>
      <div className={styles["addExpense-modal"]}>
        <h3>New goal</h3>
        {state?.errorMessage && (
          <>
            <ErrorBlock message={state?.errorMessage} />{" "}
            <div style={{ marginBottom: "40px" }}></div>
          </>
        )}

        <form action={formAction}>
          <div className={styles.inputBox}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" required />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="value">
              Value <p>Total goal's cost </p>
            </label>
            <input type="number" name="value" required />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="owned">
              Owned <p>How much you already have </p>
            </label>
            <input type="number" name="owned" required />
          </div>
          <button
            type="button"
            className={styles.btn}
            onClick={onCloseGoalModal}
          >
            Close
          </button>
          <Button />
        </form>
      </div>
    </div>
  );
}
