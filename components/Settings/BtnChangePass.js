import { useFormStatus } from "react-dom";

import styles from "./ChangePassword.module.scss";
import loadingSpinner from "@/ui/ConfirmationArea.module.scss";

export default function ButtonChangePassword({ onConfirm }) {
  const { pending } = useFormStatus();
  return (
    <button
      onClick={onConfirm}
      type="submit"
      className={styles["button-confirm"]}
    >
      Confirm{" "}
      {pending && <span className={loadingSpinner.loader}></span>}
    </button>
  );
}
