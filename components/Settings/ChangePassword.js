import styles from "./ChangePassword.module.scss";

export default function ChangePassword({ onClose, onConfirm }) {
  return (
    <div className={styles.changeOverlay}>
      <div className={styles.changeContent}>
        <h3>Change password</h3>
        <form className={styles.form}>
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
          <button
            onClick={onClose}
            type="button"
            className={styles["button-back"]}
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            type="submit"
            className={styles["button-confirm"]}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
