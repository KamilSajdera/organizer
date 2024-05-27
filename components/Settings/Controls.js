"use client";

import { useTransition } from "react";
import styles from "./Controls.module.scss";
import loadingSpinner from "@/ui/ConfirmationArea.module.scss";
import { logOut } from "@/lib/auth";

export default function Controls() {
  const [isPendingLogout, startTransitionLogout] = useTransition();

  function handleLogOut() {
    startTransitionLogout(async () => {
      await logOut();
    });
  }

  return (
    <div className={styles["user-controls"]}>
      <button>Change password</button>
      <button
        onClick={handleLogOut}
        style={isPendingLogout ? { opacity: "0.75" } : {}}
      >
        Log out
        {isPendingLogout && <span className={loadingSpinner.loader}></span>}
      </button>
    </div>
  );
}
