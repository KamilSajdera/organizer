"use client";

import { useState, useTransition } from "react";
import { logOut } from "@/lib/auth";

import styles from "./Controls.module.scss";
import loadingSpinner from "@/ui/ConfirmationArea.module.scss";
import ChangePassword from "./ChangePassword";

export default function Controls() {
  const [isPendingLogout, startTransitionLogout] = useTransition();
  const [isWantChangePassword, setIsWantChangePassword] = useState(false);

  function handleLogOut() {
    startTransitionLogout(async () => {
      await logOut();
    });
  }

  return (
    <div className={styles["user-controls"]}>
      {isWantChangePassword && (
        <ChangePassword onClose={() => setIsWantChangePassword(false)} />
      )}
      <button onClick={() => setIsWantChangePassword(true)}>
        Change password
      </button>
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
