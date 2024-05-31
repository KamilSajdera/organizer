"use client";

import { useRef, useState, useTransition } from "react";
import styles from "./ItemInput.module.scss";

import ConfirmationArea from "@/ui/ConfirmationArea";

import { updateUserData } from "@/lib/settings";

export default function ItemInput({ label, value, confirmationText, id }) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDisable, setIsDisable] = useState(true);
  const inputRef = useRef();

  function handleInputChange() {
    if (value === inputRef.current.value) setIsDisable(true);
    else setIsDisable(false);
  }

  const editedField = label === "Email" ? "email" : "username";

  async function changeUserDataHandle() {
    startTransition(async () => {
      await updateUserData(id, editedField, inputRef.current.value);
      setIsModalShow(false);
    });
  }

  return (
    <>
      {(isPending || isModalShow) && (
        <ConfirmationArea
          onClose={() => setIsModalShow(false)}
          onConfirmation={changeUserDataHandle}
        >
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
