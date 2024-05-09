import styles from "@/app/tasks/new/page.module.scss";

import { useFormStatus } from "react-dom";

export default function NewTaskButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={styles.formBtn}
      disabled={pending}
      style={pending ? { filter: "brightness(0.6)" } : {}}
    >
      {pending ? "Saving" : "Save"}
    </button>
  );
}
