export const IMAGE_FETCH_STREAM_LOADING = "IMAGE_FETCH_STREAM_LOADING";
export const IMAGE_FETCH_STREAM_SUCCESS = "IMAGE_FETCH_STREAM_SUCCESS";
export const IMAGE_FETCH_STREAM_FAIL = "IMAGE_FETCH_STREAM_FAIL";

export const IMAGE_FETCH_DATE_SUCCESS = "IMAGE_FETCH_DATE_SUCCESS";
export const IMAGE_FETCH_DATE_FAIL = "IMAGE_FETCH_DATE_FAIL";

export const IMAGE_LIKE = "IMAGE_LIKE";
export const IMAGE_DISLIKE = "IMAGE_DISLIKE";

export type ImageI = {
  date: string;
  explanation: string;
  hdurl: string;
  url: string;
  mediaType: string;
  serviceVersion: string;
  title: string;
  copyright: string | undefined;
};

interface ImageFetchStreamLoading {
  type: typeof IMAGE_FETCH_STREAM_LOADING;
}

interface ImageFetchStreamSuccess {
  type: typeof IMAGE_FETCH_STREAM_SUCCESS;
  payload: ImageI[];
}

interface ImageFetchStreamFail {
  type: typeof IMAGE_FETCH_STREAM_FAIL;
}

interface ImageFetchShareSuccess {
  type: typeof IMAGE_FETCH_DATE_SUCCESS;
  payload: ImageI;
}

interface ImageFetchShareFail {
  type: typeof IMAGE_FETCH_DATE_FAIL;
}

interface ImageLike {
  type: typeof IMAGE_LIKE;
  payload: string;
}
interface ImageDislike {
  type: typeof IMAGE_DISLIKE;
  payload: string;
}

export type ImageDispatchTypeI =
  | ImageFetchStreamLoading
  | ImageFetchStreamFail
  | ImageFetchStreamSuccess
  | ImageFetchShareSuccess
  | ImageFetchShareFail
  | ImageLike
  | ImageDislike;
