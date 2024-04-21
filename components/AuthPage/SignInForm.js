import styles from "./SignInForm.module.scss";

import InputPassword from "./InputPassword";

export default function SignInForm() {
  return (
    <form className={styles.form}>
      <div className={styles.inputBox}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder=""
          autoComplete="off"
          required
        />
        <label htmlFor="email">Email</label>
      </div>
      <InputPassword
        type="password"
        name="password"
        styles="signIn"
        label="Password"
      />
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
