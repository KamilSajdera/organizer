import Link from "next/link";

import styles from "./dashboard-banner.module.scss";

export default function DashboardBanner({title, description, href, button}) {
  return (
    <div className={styles.banner}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button>
        <Link href={href}>{button}</Link>
      </button>
    </div>
  );
}
