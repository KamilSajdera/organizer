import styles from "./LoginPage.module.scss";

import SignInForm from "./SignInForm";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <section className={styles.about}>
        <header className={styles["logo"]}>
          <div className={styles["logo_squares"]}></div>
          <h3>MANAGEO</h3>
          <p>Your organizer</p>
        </header>
        <article className={styles["login-text"]}>
          Plan, record and review your events and expenses. Add the tasks you
          need to complete, giving them the appropriate priority and deadline.
          Select a day on the calendar and assign an event to it. View, plan and
          control your expenses. All this is available to you after logging in!
        </article>
      </section>
      <section className={styles.loginArea}>
        <header className={styles.options}>
          <div className={`${styles["options-item"]} ${styles.active}`}>
            Sign In
          </div>
          <div className={styles["options-item"]}>Sign Up</div>
        </header>
        <SignInForm />
      </section>
    </main>
  );
}
