import React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import Logo from "./Icon.png";

import "./index.scss";

interface HeaderProps {
  scrollDirection: string;
}

const links = {
  ml: "https://github.com/MoshiLi95/spacestagram",
};

const Header = ({ scrollDirection }: HeaderProps) => {
  const iconClick = (link: string) => window.open(link, "_blank");
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
        <div
          className="header__content__credit"
          onClick={(e) => iconClick(links.ml)}
        >
          <p>{`Built & Desiagned by Moshi Li`} &nbsp; </p>
          <AiOutlineGithub></AiOutlineGithub>
        </div>
      </div>
    </div>
  );
};

export default Header;
