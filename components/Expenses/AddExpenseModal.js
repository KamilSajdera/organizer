import { useFormState } from "react-dom";
import { addExpense } from "@/lib/expenses";

import styles from "./AddExpenseModal.module.scss";
import ErrorBlock from "../AuthPage/ErrorBlock";
import Button from "./AddButton";

export default function AddExpenseModal({ onCloseExpenseModal, userId }) {
  const [state, formAction] = useFormState(addExpense.bind(null, userId), null);

  if (state?.success) {
    onCloseExpenseModal();
  }

  return (
    <div className={styles["addExpense-overlay"]}>
      <div className={styles["addExpense-modal"]}>
        <h3>New expense</h3>
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
            <label htmlFor="value">Value</label>
            <input type="number" name="value" required />
          </div>
          <button
            type="button"
            className={styles.btn}
            onClick={onCloseExpenseModal}
          >
            Close
          </button>
          <Button />
        </form>
      </div>
    </div>
  );
}
