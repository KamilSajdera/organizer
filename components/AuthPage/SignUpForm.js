import { useFormState } from "react-dom";
import registerUser from "@/lib/auth";

import styles from "./SignUpForm.module.scss";

import InputPassword from "./InputPassword";
import ErrorBlock from "./ErrorBlock";

import ButtonSignUp from "./ButtonSignUp";

export default function SignUpForm() {
  const [state, formAction] = useFormState(registerUser, {
    message: null,
    error_message: null,
    success_message: null,
  });

  return (
    <>
      {state?.message && <ErrorBlock message={state.message} />}
      {state?.error_message && (
        <ErrorBlock message={"An error occured: " + state.error_message} />
      )}
      {state?.success_message && <div className={styles.success}>{state?.success_message}</div>}
      <form className={styles.form} action={formAction}>
        <div className={styles.inputBox}>
          <input type="text" name="username" id="username" required />
          <label htmlFor="username">
            Username
            <p>min. 5, max 12 characters</p>
          </label>
        </div>
        <div className={styles.inputBox}>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
          />
          <label htmlFor="email">
            Email
            <p>You'll log in by email.</p>
          </label>
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
        <ButtonSignUp />
      </form>
    </>
  );
}
