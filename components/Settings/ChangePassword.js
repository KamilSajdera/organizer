import { useFormState } from "react-dom";
import { updateUserPassword } from "@/lib/settings";

import styles from "./ChangePassword.module.scss";
import ButtonChangePassword from "./BtnChangePass";

export default function ChangePassword({ id, onClose, onConfirm }) {
  const [state, formAction] = useFormState(updateUserPassword, null); 

  if (state?.success) onClose();

  return (
    <div className={styles.changeOverlay}>
      <div className={styles.changeContent}>
        <h3>Change password</h3>
        {state?.errorMessage && (
          <div className={styles.error}> {state.errorMessage} </div>
        )}
        <form className={styles.form} action={formAction}>
          <label htmlFor="old_pass">Current Password</label>
          <input
            type="password"
            id="old_pass"
            name="old_pass"
            required
            placeholder="Enter your current password"
          />
          <label htmlFor="new_pass">New Password</label>
          <input
            type="password"
            id="new_pass"
            name="new_pass"
            required
            placeholder="Enter new password"
          />
          <label htmlFor="repeat_pass">Confirm Password</label>
          <input
            type="password"
            id="repeat_pass"
            name="repeat_pass"
            required
            placeholder="Repeat your new password"
          />
          <input
            type="password"
            id="id"
            name="id"
            value={id}
            readOnly
            style={{ display: "none" }}
          />
          <button
            onClick={onClose}
            type="button"
            className={styles["button-back"]}
          >
            Close
          </button>
          <ButtonChangePassword onConfirm={onConfirm} />
        </form>
      </div>
    </div>
  );
}
