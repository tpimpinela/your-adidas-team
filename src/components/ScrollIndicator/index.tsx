import useShowScrollIndicator from "../../hooks/useShowScrollIndicator";
import Button from "../Button";
import styles from "./ScrollIndicator.module.css";

const handleClick = () => {
  window?.scrollTo({ top: 0, behavior: "smooth" });
};

const ScrollIndicator = () => {
  const showScrollIndicator = useShowScrollIndicator();

  return (
    <div
      data-testid="scroll-indicator"
      className={`${styles["scroll-indicator"]} ${
        showScrollIndicator && styles["scroll-indicator--shown"]
      }`}
    >
      <Button onClick={handleClick}>
        <span className={styles["scroll-indicator__icon"]}>&#xab;</span>
      </Button>
    </div>
  );
};

export default ScrollIndicator;
