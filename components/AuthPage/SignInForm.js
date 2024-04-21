import styles from "./SignInForm.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export default function SignInForm() {
  return (
    <form className={styles.form}>
      <div className={styles.inputBox}>
        <input type="email" name="email" id="email" placeholder="" autoComplete="off" required />
        <label htmlFor="email">Email</label>
      </div>
      <div className={styles.inputBox}>
        <input
          type="password"
          name="password"
          id="password"
          placeholder=""
          required
        />
        <label htmlFor="password">Password</label>
        <FontAwesomeIcon icon={faEye} />
      </div>
      <div className={styles.inputRemember}>
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me</label>
      </div>
      <button type="submit" className={styles.btnLog}>
        Log in
      </button>
    </form>
  );
}
