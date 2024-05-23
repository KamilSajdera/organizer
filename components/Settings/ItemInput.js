import styles from "./ItemInput.module.scss";

export default function ItemInput({ label, value, disable = false }) {
  return (
    <div className={styles.itemInput}>
      <label htmlFor={label}>{label}</label>
      <input type="text" name={label} defaultValue={value}/>
      <button>Edit</button>
    </div>
  );
}
