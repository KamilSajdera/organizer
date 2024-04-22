import { useFormState } from "react-dom";
import registerUser from "@/lib/auth";

import styles from "./SignUpForm.module.scss";

import InputPassword from "./InputPassword";
import ErrorBlock from "./ErrorBlock";

export default function SignUpForm() {
  const [state, formAction] = useFormState(registerUser, { message: null });

  return (
    <>
      {state?.message && <ErrorBlock message={state.message} />}
      <form className={styles.form} action={formAction}>
        <div className={styles.inputBox}>
          <input type="text" name="username" id="username" required />
          <label htmlFor="username">Username</label>
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
    </>
  );
}
