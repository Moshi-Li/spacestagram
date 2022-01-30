import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootStoreI } from "../../Store";
import { getImageToday } from "../../actions/ImageActions";
import { BiLoaderCircle } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const SideContent = () => {
  const dispatch = useDispatch();
  const { imageToday, imageTodayFetching } = useSelector(
    (store: RootStoreI) => store.image
  );

  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    dispatch(getImageToday());

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const left = (width - 300 - 600) / 2 + 600;
  return (
    <div className="home__side-content" style={{ left }}>
      <p className="home__side-content__title">Image of the day</p>

      <div className="home__side-content__img">
        {imageToday && <img src={imageToday.url} alt={imageToday.title}></img>}
        {imageTodayFetching && (
          <BiLoaderCircle className="home__loader"></BiLoaderCircle>
        )}
        {!imageToday && !imageTodayFetching && (
          <AiOutlineReload
            className="home__reload"
            onClick={() => dispatch(getImageToday())}
          ></AiOutlineReload>
        )}
      </div>
    </div>
  );
};

export default SideContent;
