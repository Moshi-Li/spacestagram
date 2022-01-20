import React, { useState } from "react";
import {
  ShareIosMinor,
  ThumbsUpMinor,
  PromoteMinor,
} from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import "./index.scss";

interface PostPropsI {
  url: string;
  hdurl: string;
  title: string;
  date: string;
  explanation: string;
}

const Post = ({ url, hdurl, title, date, explanation }: PostPropsI) => {
  const [likeBtnColor, setLikeBtnColor] = useState<"primary" | "critical">(
    "primary"
  );
  const [shareBtnColor, setShareBtnColor] = useState<"primary" | "highlight">(
    "primary"
  );
  const [fullExplanation, setFullExplanation] = useState<boolean>(false);

  return (
    <div className="post">
      <div className="post__img">
        <img
          src={hdurl}
          style={{ backgroundImage: `url(${url})` }}
          alt={title}
        ></img>
      </div>
      <div className="post__actions">
        <div
          className="post__actions__icon"
          title="Like"
          onMouseOver={() => setLikeBtnColor("critical")}
          onMouseLeave={() => setLikeBtnColor("primary")}
        >
          <Icon source={ThumbsUpMinor} color={likeBtnColor} />
        </div>
        <div
          className="post__actions__icon"
          title="Share"
          onMouseOver={() => setShareBtnColor("highlight")}
          onMouseLeave={() => setShareBtnColor("primary")}
        >
          <Icon source={PromoteMinor} color={shareBtnColor} />
        </div>
      </div>
      <div className="post__title">
        <p>{title}</p>
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
