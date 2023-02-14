import useMyOwnSquad from "../../hooks/useMyOwnSquad";
import styles from "./ValidationMessage.module.css";

const ValidationMessage = () => {
  const { validationsMessage } = useMyOwnSquad();

  return (
    <div className={styles.validation}>
      <h3 className={styles["validation__header"]}>
        {validationsMessage
          ? "Your team will be ready when:"
          : "Your team is ready"}
      </h3>
      {validationsMessage && (
        <span
          data-testid="validation-message"
          className={styles["validation__message"]}
        >
          {validationsMessage}
        </span>
      )}
    </div>
  );
};

export default ValidationMessage;
