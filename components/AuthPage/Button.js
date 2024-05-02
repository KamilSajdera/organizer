import { useFormStatus } from "react-dom";
import styles from "./SignUpForm.module.scss";

export default function Button({pendingText, value, style}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${styles.btnLog} ${pending && styles["btnLog-off"]}`}
      type="submit"
      style={style}
      disabled={pending}
    >
      {pending ? pendingText : value}
    </button>
  );
}
