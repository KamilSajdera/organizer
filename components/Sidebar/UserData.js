import Image from "next/image";
import styles from "./UserData.module.scss";

import default_logo from "@/public/default-image.png";

export default function UserData({ username, email, image }) {
  const isImage = image?.trim().length > 0 || false;

  return (
    <div className={styles["user-area"]}>
      {!isImage && (
        <Image src={default_logo} alt="User profile image" width={40} />
      )}
      {isImage && <img src={image} alt="User profile image" />}
      <h4>{username}</h4>
      <p>({email})</p>
    </div>
  );
}
