import { useFormStatus } from "react-dom";
import styles from "./NewEvent.module.scss";
import loadingSpinner from "@/ui/ConfirmationArea.module.scss";

export default function NewEventSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`${styles.button} ${styles["button-save"]}`}
    >
      Confirm
      {pending ? <span className={loadingSpinner.loader}></span> : ""}
    </button>
  );
}
