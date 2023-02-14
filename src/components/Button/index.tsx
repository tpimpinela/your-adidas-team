import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  onClick: () => void;
  children?: ReactNode;
}

const Button = ({ onClick, children }: Props) => (
  <button
    data-testid="button-component"
    className={styles.button}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
