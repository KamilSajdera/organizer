"use client";

import { useRef, useState } from "react";
import styles from "./ItemInput.module.scss";

import ConfirmationArea from "@/ui/ConfirmationArea";

export default function ItemInput({ label, value, confirmationText }) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const inputRef = useRef();

  function handleInputChange() {
    if (value === inputRef.current.value) setIsDisable(true);
    else setIsDisable(false);
  }

  return (
    <>
      {isModalShow && (
        <ConfirmationArea onClose={() => setIsModalShow(false)}>
          {confirmationText}
        </ConfirmationArea>
      )}
      <div className={styles.itemInput}>
        <label htmlFor={label}>{label}</label>
        <input
          type="text"
          name={label}
          defaultValue={value}
          ref={inputRef}
          onChange={handleInputChange}
        />
        <button
          onClick={() => setIsModalShow(true)}
          disabled={isDisable}
          style={isDisable ? { opacity: "0.6", cursor: "no-drop" } : {}}
        >
          Edit
        </button>
      </div>
    </>
  );
}
