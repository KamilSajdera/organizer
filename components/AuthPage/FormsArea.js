"use client";
import { useState } from "react";

import styles from "./FormsArea.module.scss";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function FormsArea() {
  const [whichForm, setWhichForm] = useState(1);

  const className = (nr) => {
    if (nr === whichForm) return `${styles["options-item"]} ${styles.active}`;
    else return styles["options-item"];
  };
  return (
    <section className={styles.loginArea}>
      <header className={styles.options}>
        <div className={className(1)} onClick={() => setWhichForm(1)}>
          Sign In
        </div>
        <div className={className(2)} onClick={() => setWhichForm(2)}>
          Sign Up
        </div>
      </header>
      {whichForm === 1 && <SignInForm />}
      {whichForm === 2 && <SignUpForm />}
    </section>
  );
}
