"use client";

import { useState } from "react";
import styles from "./ItemInput.module.scss";

import ConfirmationArea from "@/ui/ConfirmationArea";

export default function ItemInput({ label, value, confirmationText, disable = false }) {
  const [isModalShow, setIsModalShow] = useState(false);

  return (
    <>
      {isModalShow && (
        <ConfirmationArea onClose={() => setIsModalShow(false)}>
          {confirmationText}
        </ConfirmationArea>
      )}
      <div className={styles.itemInput}>
        <label htmlFor={label}>{label}</label>
        <input type="text" name={label} defaultValue={value} />
        <button onClick={() => setIsModalShow(true)}>Edit</button>
      </div>
    </>
  );
}
