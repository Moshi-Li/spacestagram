import InfiniteScroll from "react-infinite-scroll-component";
import { GoSync } from "react-icons/go";

import { RootState, useAppSelector, useAppDispatch } from "../../store";
import { fetchMoreHomeContent } from "../../slices/homeSlice";

import ImageBlock from "./ImageBlock";

import "./index.scss";

//https://apod.nasa.gov/apod/image/1101/OpportunitySol2476_Kremer600hc.jpg
const ImageHome = () => {
  const { images } = useAppSelector((store: RootState) => store.homeReducer);
  const dispatch = useAppDispatch();

  return (
    <div id="scrollableDivHome" className="home--container">
      <InfiniteScroll
        scrollableTarget="scrollableDivHome"
        dataLength={images.length} //This is important field to render the next data
        next={() => {
          dispatch(fetchMoreHomeContent());
        }}
        hasMore={true}
        loader={
          <span className="loader--icon">
            <GoSync></GoSync>
          </span>
        }
        endMessage={<></>}
      >
        {images.map((item) => {
          return <ImageBlock key={item.date} imageData={item}></ImageBlock>;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default ImageHome;
