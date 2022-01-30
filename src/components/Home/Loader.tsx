import React from "react";

import { BiLoaderCircle } from "react-icons/bi";

interface LoaderPropsI {
  fill: boolean;
}

const Loader = ({ fill = false }: LoaderPropsI) => {
  return (
    <div className={`home__loader${fill ? " home__loader--fill" : ""}`}>
      <BiLoaderCircle></BiLoaderCircle>
    </div>
  );
};

export default Loader;
