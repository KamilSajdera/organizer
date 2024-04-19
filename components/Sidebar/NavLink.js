"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./NavItems.module.scss";

export default function NavLink({ href, children }) {
  const path = usePathname();

  const className = () => {
    if (path.startsWith(href) && href.length > 1)
      return `${styles["mainNav-item"]} ${styles.active}`;
    else if (href === "/" && path === "/")
      return `${styles["mainNav-item"]} ${styles.active}`;
    else return styles["mainNav-item"];
  };

  return (
    <Link href={href} className={className()}>
      {children}
    </Link>
  );
}
