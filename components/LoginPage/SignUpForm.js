import styles from "./SignUpForm.module.scss";

export default function SignUpForm() {
  return (
    <form className={styles.form}>
      <div className={styles.inputBox}>
        <input type="text" name="text" id="text" required />
        <label htmlFor="text">Username</label>
      </div>
      <div className={styles.inputBox}>
        <input type="email" name="email" id="email" required autoComplete="off"/>
        <label htmlFor="email">Email</label>
      </div>
      <div className={styles.inputBox}>
        <input type="password" name="password" id="password" required />
        <label htmlFor="password">Password</label>
      </div>
      <div className={styles.inputBox}>
        <input type="password" name="password" id="password" required />
        <label htmlFor="password">Confirm password</label>
      </div>
      <button type="submit" className={styles.btnLog}>
        Sign Up
      </button>
    </form>
  );
}
