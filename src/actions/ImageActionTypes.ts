export const IMAGE_FETCH_STREAM_LOADING = "IMAGE_FETCH_STREAM_LOADING";
export const IMAGE_FETCH_STREAM_SUCCESS = "IMAGE_FETCH_STREAM_SUCCESS";
export const IMAGE_FETCH_STREAM_FAIL = "IMAGE_FETCH_STREAM_FAIL";

export const IMAGE_FETCH_TODAY_SUCCESS = "IMAGE_FETCH_TODAY_SUCCESS";
export const IMAGE_FETCH_TODAY_FAIL = "IMAGE_FETCH_TODAY_FAIL";

export const IMAGE_FETCH_SHARE_SUCCESS = "IMAGE_FETCH_SHARE_SUCCESS";
export const IMAGE_FETCH_SHARE_FAIL = "IMAGE_FETCH_SHARE_FAIL";

export type ImageI = {
  date: string;
  explanation: string;
  hdurl: string;
  url: string;
  mediaType: string;
  serviceVersion: string;
  title: string;
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

interface ImageFetchTodaySuccess {
  type: typeof IMAGE_FETCH_TODAY_SUCCESS;
  payload: ImageI;
}

interface ImageFetchTodayFail {
  type: typeof IMAGE_FETCH_TODAY_FAIL;
}

interface ImageFetchShareSuccess {
  type: typeof IMAGE_FETCH_SHARE_SUCCESS;
  payload: ImageI;
}

interface ImageFetchShareFail {
  type: typeof IMAGE_FETCH_SHARE_FAIL;
}

export type ImageDispatchTypeI =
  | ImageFetchStreamLoading
  | ImageFetchStreamFail
  | ImageFetchStreamSuccess
  | ImageFetchTodaySuccess
  | ImageFetchTodayFail
  | ImageFetchShareSuccess
  | ImageFetchShareFail;
