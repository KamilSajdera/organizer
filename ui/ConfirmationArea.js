import styles from "./ConfirmationArea.module.scss";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmationArea({
  children,
  onConfirmation,
  onClose,
}) {
  const [isPending, setIsPending] = useState(false);
  function handleOnConfirmation() {
    onConfirmation();
    setIsPending(true);
  }

  return (
    <div className={styles.confirmationOverlay}>
      <div className={styles.confirmationWrapper}>
        <FontAwesomeIcon icon={faClipboardCheck} />
        <h3>Are you sure?</h3>
        <p>{children}</p>
        <div className={styles.controls}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleOnConfirmation}>
            Confirm
            {isPending && <span class={styles.loader}></span>}
          </button>
        </div>
      </div>
    </div>
  );
}
