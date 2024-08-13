import { useFormStatus } from "react-dom";

import styles from "./AddExpenseModal.module.scss";
import loadingSpinner from "@/ui/ConfirmationArea.module.scss";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`${styles.btn} ${styles.add}`}>
      Add {pending ? <span className={loadingSpinner.loader}></span> : ""}
    </button>
  );
}
