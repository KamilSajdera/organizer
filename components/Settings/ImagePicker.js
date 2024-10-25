"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import styles from "./Container.module.scss";

import logo from "@/public/default-image.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export default function ImagePicker() {
  const inputRef = useRef();
  const [pickedImage, setPickedImage] = useState(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    console.log(file);

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  function handleCancelUpload() {
    setPickedImage(null);
  }

  return (
    <div className={styles["image-box"]}>
      <Image
        src={pickedImage ? pickedImage : logo}
        fill
        alt="User profile image"
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
        onChange={handleImageChange}
      />
      {pickedImage && (
        <>
          <button className={styles["button-accept"]}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className={styles["button-cancel"]} onClick={handleCancelUpload}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </>
      )}
      {!pickedImage && (
        <button onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faImage} />
        </button>
      )}
    </div>
  );
}
