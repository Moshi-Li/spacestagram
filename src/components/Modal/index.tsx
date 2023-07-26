import { useCallback, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import { GoPaperAirplane } from "react-icons/go";

import { RootState, useAppSelector, useAppDispatch } from "../../store";
import { resetModal, insertComment } from "../../slices/modalSlice";
import { updateComment } from "../../slices/homeSlice";
import { ModalStatus } from "../../slices/interface";
import Loading from "../Loader";

import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.scss";

const ModalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const commentListRef = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();
  const { imageDetail, modalStatus } = useAppSelector(
    (store: RootState) => store.modalReducer
  );

  // Resize modal on window resize
  useEffect(() => {
    const resize = () => {
      if (containerRef.current?.clientWidth !== undefined)
        setContainerHeight(containerRef.current.clientWidth * (9 / 16));
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const updateCommentOnDeconstruct = () => {
      if (imageDetail !== undefined) {
        dispatch(updateComment({ imageDate: imageDetail.date }));
      }
    };
    return () => {
      updateCommentOnDeconstruct();
    };
  }, [dispatch, imageDetail]);

  useEffect(() => {
    const lastChildElement = commentListRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [imageDetail?.comments.length]);

  const shareClick = useCallback(() => {
    if (imageDetail?.date) {
      navigator.clipboard.writeText(
        `${location.origin}${location.pathname}?date=${imageDetail?.date}`
      );
      toast("Share link copied to clipboard", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [imageDetail?.date]);

  const postClick = useCallback(() => {
    if (imageDetail?.date && inputValue) {
      dispatch(
        insertComment({
          imageDate: imageDetail?.date,
          text: inputValue,
        })
      );
      setInputValue("");
    }
  }, [dispatch, imageDetail?.date, inputValue]);

  return (
    <div className="modal--backdrop" onClick={() => dispatch(resetModal())}>
      <div
        ref={containerRef}
        style={{ height: `${containerHeight}px` }}
        className="modal--container"
        onClick={(e) => e.stopPropagation()}
      >
        {modalStatus === ModalStatus.Ready && (
          <>
            <div className="img--section">
              <LazyLoadImage
                src={imageDetail?.hdurl}
                width={"100%"}
                placeholderSrc={imageDetail?.url}
                alt="Image Alt"
                effect="blur"
                style={{ maxHeight: `${containerHeight}px` }}
              />
            </div>
            <div className="comment--section">
              <div className="comment--list" ref={commentListRef}>
                <p>{imageDetail?.explanation}</p>
                {imageDetail?.comments.map((comment, index) => {
                  return (
                    <p key={`${comment.date}:${index}`}>
                      <span>anonymous_user: </span>
                      {comment.text}
                    </p>
                  );
                })}
              </div>

              <div className="share--icon">
                <span onClick={() => shareClick()}>
                  <GoPaperAirplane></GoPaperAirplane>
                </span>
              </div>

              <div className="comment--input">
                <textarea
                  value={inputValue}
                  onChange={(e) => {
                    if (e.target.value.length < 1000)
                      setInputValue(e.target.value);
                  }}
                  placeholder="Add Comment ..."
                ></textarea>
                {inputValue.length > 0 && (
                  <span onClick={() => postClick()}>Post</span>
                )}
              </div>
            </div>
          </>
        )}
        {modalStatus === ModalStatus.Loading && <Loading></Loading>}
      </div>
    </div>
  );
};

export default ModalComponent;
