import { useCallback, useState } from "react";

import { useAppDispatch } from "../../store";
import { insertComment } from "../../slices/homeSlice";
import { ImageDetail } from "../../slices/interface";
import { setModalOpen, setTargetImage } from "../../slices/modalSlice";

const CommentSection = ({
  comments,
  imageData,
}: {
  comments: string[];
  imageData: ImageDetail;
}) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useAppDispatch();

  const viewMoreClick = useCallback(() => {
    dispatch(setModalOpen(true));
    dispatch(
      setTargetImage({
        targetImage: imageData.date,
      })
    );
  }, [dispatch, imageData.date]);

  const postClick = useCallback(() => {
    dispatch(insertComment({ imageDate: imageData.date, text: commentText }));
    setCommentText("");
  }, [dispatch, commentText, imageData.date]);

  return (
    <div className="comment--section">
      {comments.length > 0 && (
        <p>
          <span>anonymous_user:&nbsp;</span>
          {comments[0]}
        </p>
      )}

      {comments.length > 1 && (
        <span onClick={() => viewMoreClick()}>{`View all ${
          comments.length + 1
        } comments`}</span>
      )}

      <div className="comment--input">
        <textarea
          placeholder="Add Comment ..."
          className="comment--input"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>

        {commentText.length > 0 && (
          <span onClick={() => postClick()}>Post</span>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
