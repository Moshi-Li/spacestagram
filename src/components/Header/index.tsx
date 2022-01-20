import React from "react";
import "./index.scss";
import Logo from "./Icon.png";

interface HeaderProps {
  scrollDirection: string;
}

const Header = ({ scrollDirection }: HeaderProps) => {
  return (
    <div
      className={`header header--${
        scrollDirection === "UP" ? "fade-in" : "fade-out"
      }`}
    >
      <div className="header__content">
        <img
          className="header__content__logo"
          src={Logo}
          alt="Moshi Li"
          onClick={() =>
            window.open(
              window.location.origin + window.location.pathname,
              "_self"
            )
          }
        ></img>
        <div></div>
      </div>
    </div>
  );
};

export default Header;
