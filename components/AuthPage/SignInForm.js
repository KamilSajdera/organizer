import { useFormState } from "react-dom";

import styles from "./SignInForm.module.scss";

import InputPassword from "./InputPassword";
import ErrorBlock from "./ErrorBlock";
import Button from "./Button";

import { loginUser } from "@/lib/auth";

export default function SignInForm() {
  const [state, formAction] = useFormState(loginUser, null);

  return (
    <>
      {state?.message && <ErrorBlock message={state.message} />}
      <form className={styles.form} action={formAction}>
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
          <input type="checkbox" id="remember" name="remember"/>
          <label htmlFor="remember">Remember me</label>
        </div>
        <Button
          pendingText="Logging"
          value="Log in"
          style={{ marginTop: "20px" }}
        />
      </form>
    </>
  );
}
