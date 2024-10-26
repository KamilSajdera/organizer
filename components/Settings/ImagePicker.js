"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import styles from "./Container.module.scss";

import logo from "@/public/default-image.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

import { uploadImage } from "@/lib/cloudinary";
import { updateUserData } from "@/lib/settings";

export default function ImagePicker({ userId }) {
  const inputRef = useRef();
  const [pickedImage, setPickedImage] = useState(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

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

  async function handleUploadImage() {
    try {
      const url = await uploadImage(pickedImage);
      await updateUserData(userId, "profile_image", url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
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
          <button
            className={styles["button-accept"]}
            onClick={handleUploadImage}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            className={styles["button-cancel"]}
            onClick={handleCancelUpload}
          >
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
