import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsShare, BsShareFill } from "react-icons/bs";
import { toast as toastClient } from "react-toastify";

import "./index.scss";

interface PostPropsI {
  url: string;
  hdurl: string;
  title: string;
  date: string;
  explanation: string;
  copyright: string | undefined;
  mediaType: string;
}

const Post = ({
  url,
  hdurl,
  title,
  date,
  explanation,
  copyright,
  mediaType,
}: PostPropsI) => {
  const [imageSrc, setImageSrc] = useState(hdurl);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [postLiked, setPostLiked] = useState(
    !!localStorage.getItem(date)?.length
  );
  const [likeBtnColor, setLikeBtnColor] = useState<"primary" | "critical">(
    !!localStorage.getItem(date)?.length ? "critical" : "primary"
  );
  const [shareBtnHover, setShareBtnHover] = useState<boolean>(false);
  const [fullExplanation, setFullExplanation] = useState<boolean>(false);

  const shareClick = () => {
    navigator.clipboard
      .writeText(
        `${window.location.origin + window.location.pathname}?share=${date}`
      )
      .then(() => {
        toastClient.success("Share link copied to clipboard");
      });
  };

  const likeImage = () => {
    localStorage.setItem(date, "t");
    setPostLiked(true);
  };
  const dislikeImage = () => {
    localStorage.removeItem(date);
    setPostLiked(false);
  };

  return (
    <div className="post">
      <div className="post__img">
        {mediaType === "image" && (
          <img
            src={imageSrc}
            style={{
              backgroundImage: `url(${url})`,
              filter: `${sourceLoaded ? "none" : "blur(5px)"}`,
            }}
            onLoad={() => {
              setSourceLoaded(true);
            }}
            onError={() => {
              if (imageSrc === hdurl) setImageSrc(url);
              console.log(`error loading ${title}`);
              setSourceLoaded(true);
            }}
            alt={title}
          ></img>
        )}
        {mediaType === "video" && (
          <div className="iframe">
            <iframe
              className="responsive-iframe"
              title={`vedio for ${date}`}
              src={url}
              allowFullScreen
              frameBorder={0}
            ></iframe>
          </div>
        )}
      </div>
      <div className="post__actions">
        <div
          className="post__actions__icon"
          title="Like"
          onClick={() => {
            if (postLiked) {
              dislikeImage();
            } else {
              likeImage();
            }
          }}
        >
          {postLiked && <AiFillHeart></AiFillHeart>}
          {!postLiked && <AiOutlineHeart></AiOutlineHeart>}
        </div>
        <div
          className="post__actions__icon"
          title="Share"
          onMouseOver={() => setShareBtnHover(true)}
          onMouseLeave={() => setShareBtnHover(false)}
          onClick={() => shareClick()}
        >
          {shareBtnHover && <BsShareFill></BsShareFill>}
          {!shareBtnHover && <BsShare></BsShare>}
        </div>
      </div>
      <div className="post__title">
        <p>{title}</p>
        {copyright === undefined ? null : (
          <React.Fragment>
            &nbsp;by&nbsp;<span>{copyright}</span>
          </React.Fragment>
        )}
      </div>
      <div className="post__date">
        <p>{date}</p>
      </div>
      <div className="post__explanation">
        <p
          className={`post__explanation__${fullExplanation ? `full` : `brief`}`}
        >
          {explanation}
        </p>
        {fullExplanation ? null : (
          <span
            className="post__explanation__more"
            onClick={() => {
              setFullExplanation(true);
            }}
          >
            more
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
