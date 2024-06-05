"use client";

import { useRouter, usePathname } from "next/navigation";

import Link from "next/link";
import styles from "./PageHeader.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function PageHeader({ title, href }) {
  const router = useRouter();
  const pathname = usePathname();

  function handle(e) {
    const { value } = e.target;
    router.push(`${pathname}?q=${value}`)
  }
  return (
    <header className={styles.header}>
      <h1>{title} View</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Search" onChange={handle} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </form>
      {href && <div className={styles["add-button"]}>
        <Link href={`${href}/new`}>+</Link>
      </div>}
    </header>
  );
}
