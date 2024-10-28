import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";

import styles from "./Container.module.scss";

import ImagePicker from "./ImagePicker";
import ItemInput from "./ItemInput";
import Controls from "./Controls";

import { verifySession, getUserData } from "@/lib/session";

export default async function Container() {
  const session = await verifySession();

  if (!session.isAuth)
    throw new Error("Your session expired. Please, sign in.");

  const { username, email, profile_image } = await getUserData(session.userId);

  return (
    <>
      <header className={styles.header}>
        <FontAwesomeIcon icon={faGears} />
        User settings
      </header>
      <ImagePicker userId={session?.userId} userImage={profile_image}/>
      <section className={styles["user-data"]}>
        <ItemInput
          label="Nickname"
          value={username}
          confirmationText="You are going to edit your display username."
          id={session.userId}
        />
        <ItemInput
          label="Email"
          value={email}
          confirmationText="You are going to edit your email. Remember! You will log in with this email in the future."
          id={session.userId}
        />
      </section>
      <Controls id={session.userId} />
    </>
  );
}
