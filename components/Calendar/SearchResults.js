import styles from "./SearchResults.module.scss";

export default function SearchResults({ events }) {
  return (
    <>
      <h2>Results: </h2>
      { events.length <= 0 && <p>Couldn't find an events...</p>}
      <ul className={styles.results}>
        {events.map((item, index) => (
          <li className={styles["results-item"]} key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h5>
              Start:{" "}
              {new Date(item.start).toLocaleDateString("pl-PL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </h5>
            <div className={styles.hr}></div>
          </li>
        ))}
      </ul>
    </>
  );
}
