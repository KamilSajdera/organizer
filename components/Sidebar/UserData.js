import Image from "next/image";
import styles from "./UserData.module.scss";

import default_logo from "@/public/default-image.png";

export default function UserData() {
  return (
    <div className={styles["user-area"]}>
      <Image src={default_logo} alt="User profile image" width={40}/>
      <h4>Nickname</h4>
      <p>(email@example.com)</p>
    </div>
  );
}
