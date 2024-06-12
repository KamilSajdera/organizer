import { useEffect, useRef } from "react";
import styles from "./EventDetails.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const formatDateTime = (date) => {
  const day = date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return { day, time };
};

export default function EventDetails({
  title,
  description,
  all_day,
  has_end,
  start,
  end,
  onClose,
}) {
  const modalRef = useRef();
  const startDateTime = formatDateTime(start);
  const endDateTime = has_end ? formatDateTime(end) : { day: "", time: "" };

  const isSameDay =
    start.toLocaleDateString("pl-PL") === end.toLocaleDateString("pl-PL");

  const displayStartData = isSameDay
    ? startDateTime.time
    : `<b>${startDateTime.day}</b> ${startDateTime.time}`;

  const displayEndData = has_end
    ? isSameDay
      ? endDateTime.time
      : `<b>${endDateTime.day}</b> ${endDateTime.time}`
    : "";

  const durationFormat = all_day
    ? "All day"
    : `${displayStartData} - ${displayEndData}`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className={styles["event-details"]} ref={modalRef}>
      <FontAwesomeIcon icon={faCircleInfo} />
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles["event-details_duration"]}>
        <FontAwesomeIcon icon={faClock} />{" "}
        <div dangerouslySetInnerHTML={{ __html: durationFormat }} />
      </div>
      <button className={styles.btnClose} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
