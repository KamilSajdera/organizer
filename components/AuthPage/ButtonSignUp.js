import { useFormStatus } from "react-dom";
import styles from "./SignUpForm.module.scss";

export default function ButtonSignUp() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${styles.btnLog} ${pending && styles["btnLog-off"]}`}
      type="submit"
      disabled={pending}
    >
      {pending ? "Saving..." : "Sign Up"}
    </button>
  );
}
