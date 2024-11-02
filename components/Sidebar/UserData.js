import Image from "next/image";
import styles from "./UserData.module.scss";

import default_logo from "@/public/default-image.png";

export default function UserData({ username, email, image }) {
  const isImage = image?.trim().length > 0 || false;

  return (
    <div className={styles["user-area"]}>
      <Image
        src={isImage ? image : default_logo}
        alt="User profile image"
        fill
        priority
      />

      <h4>{username}</h4>
      <p>({email})</p>
    </div>
  );
}
