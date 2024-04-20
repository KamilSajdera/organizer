import styles from "./AuthPage.module.scss";

import FormsArea from "./FormsArea";

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
      <FormsArea />
    </main>
  );
}
