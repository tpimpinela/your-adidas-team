import styles from "./Header.module.css";
import adidasLogo from "../../assets/adidas-logo.png";

const Header = () => (
  <header className={styles.header}>
    <h1>
      Your
      <img className={styles.header__logo} src={adidasLogo} />
      team
    </h1>
  </header>
);

export default Header;
