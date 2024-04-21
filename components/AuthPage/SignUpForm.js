import styles from "./SignUpForm.module.scss";

import InputPassword from "./InputPassword";

export default function SignUpForm() {
  return (
    <form className={styles.form}>
      <div className={styles.inputBox}>
        <input type="text" name="text" id="text" required />
        <label htmlFor="text">Username</label>
      </div>
      <div className={styles.inputBox}>
        <input
          type="email"
          name="email"
          id="email"
          required
          autoComplete="off"
        />
        <label htmlFor="email">Email</label>
      </div>
      <InputPassword
        type="password"
        name="password"
        styles="signUp"
        label="Password"
      />
      <InputPassword
        type="password"
        name="Cpassword"
        styles="signUp"
        label="Confirm password"
      />
      <button type="submit" className={styles.btnLog}>
        Sign Up
      </button>
    </form>
  );
}
