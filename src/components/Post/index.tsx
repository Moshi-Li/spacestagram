import React, { useState } from "react";
import { useAlert } from "react-alert";
import { ThumbsUpMinor, PromoteMinor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import "./index.scss";

interface PostPropsI {
  url: string;
  hdurl: string;
  title: string;
  date: string;
  explanation: string;
  copyright: string | undefined;
}

const Post = ({
  url,
  hdurl,
  title,
  date,
  explanation,
  copyright,
}: PostPropsI) => {
  const alterClient = useAlert();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLiked, setImageLiked] = useState(
    !!localStorage.getItem(date)?.length
  );
  const [likeBtnColor, setLikeBtnColor] = useState<"primary" | "critical">(
    !!localStorage.getItem(date)?.length ? "critical" : "primary"
  );
  const [shareBtnColor, setShareBtnColor] = useState<"primary" | "highlight">(
    "primary"
  );
  const [fullExplanation, setFullExplanation] = useState<boolean>(false);

  const shareClick = () => {
    navigator.clipboard
      .writeText(
        `${window.location.origin + window.location.pathname}?share=${date}`
      )
      .then(() => {
        alterClient.success("Share link copied to clipboard");
      });
  };

  const likeImage = () => {
    localStorage.setItem(date, "t");
    setImageLiked(true);
  };
  const dislikeImage = () => {
    localStorage.removeItem(date);
    setImageLiked(false);
  };

  return (
    <div className="post">
      <div className="post__img">
        <img
          src={hdurl}
          style={{
            backgroundImage: `url(${url})`,
            filter: `${imageLoaded ? "none" : "blur(5px)"}`,
          }}
          onLoad={() => {
            console.log(`${date} loaded`);
            setImageLoaded(true);
          }}
          alt={title}
        ></img>
      </div>
      <div className="post__actions">
        <div
          className="post__actions__icon"
          title="Like"
          onMouseOver={() => setLikeBtnColor("critical")}
          onMouseLeave={() => (imageLiked ? null : setLikeBtnColor("primary"))}
          onClick={() => {
            if (imageLiked) {
              dislikeImage();
              setLikeBtnColor("primary");
            } else {
              likeImage();
              setLikeBtnColor("critical");
            }
          }}
        >
          <Icon source={ThumbsUpMinor} color={likeBtnColor} />
        </div>
        <div
          className="post__actions__icon"
          title="Share"
          onMouseOver={() => setShareBtnColor("highlight")}
          onMouseLeave={() => setShareBtnColor("primary")}
          onClick={() => shareClick()}
        >
          <Icon source={PromoteMinor} color={shareBtnColor} />
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
