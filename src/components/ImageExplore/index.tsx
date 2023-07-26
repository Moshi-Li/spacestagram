import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GoSync } from "react-icons/go";

import { RootState, useAppSelector, useAppDispatch } from "../../store";
import {
  fetchExploreContent,
  fetchMoreExploreContent,
  reset,
} from "../../slices/exploreSlice";
import { ExploreStatus } from "../../slices/interface";

import Loading from "../Loader";
import ImageBlock from "./ImageBlock";

import "./index.scss";

const ImageExplore = () => {
  const { images, status } = useAppSelector(
    (store: RootState) => store.exploreReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExploreContent(12));
    const resetOnDeconstruct = () => dispatch(reset());
    return () => {
      resetOnDeconstruct();
    };
  }, [dispatch]);

  return (
    <>
      {(status === ExploreStatus.Ready || status === ExploreStatus.Adding) && (
        <div id="scrollableDivExplore" className="explore--container">
          <InfiniteScroll
            scrollableTarget="scrollableDivExplore"
            className="infinite--scroll"
            dataLength={images.length / 3} //This is important field to render the next data
            next={() => {
              dispatch(fetchMoreExploreContent(6));
            }}
            hasMore={true}
            loader={
              <span className="loader--icon">
                <GoSync></GoSync>
              </span>
            }
            endMessage={<></>}
          >
            {images.map((_, index) => {
              if ((index + 1) % 3 === 0) {
                return (
                  <ImageBlock
                    key={index}
                    imageData={images.slice(index - 2, index + 1)}
                  ></ImageBlock>
                );
              }
              {
                return null;
              }
            })}
          </InfiniteScroll>
        </div>
      )}
      {status === ExploreStatus.Loading && <Loading />}
    </>
  );
};

export default ImageExplore;
