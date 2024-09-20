import React from "react";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = today.toLocaleDateString("pt-BR", options);

  return (
    <div className={styles["container-header"]}>
      <Image src={logo} alt="Logo" />
      <h1>Bem-vindo de volta, Marcus</h1>
      <span>{formattedDate}</span>
    </div>
  );
};

export default Header;
