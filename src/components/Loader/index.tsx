import styles from "./Loader.module.css";

const Loader = () => (
  <div className={styles["loader-container"]}>
    <div className={styles.loader}></div>
    <span>Loading...</span>
  </div>
);

export default Loader;
