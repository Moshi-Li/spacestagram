export const IMAGE_FETCH_STREAM_LOADING = "IMAGE_FETCH_STREAM_LOADING";
export const IMAGE_FETCH_STREAM_SUCCESS = "IMAGE_FETCH_STREAM_SUCCESS";
export const IMAGE_FETCH_STREAM_FAIL = "IMAGE_FETCH_STREAM_FAIL";

export const IMAGE_FETCH_DATE_SUCCESS = "IMAGE_FETCH_DATE_SUCCESS";
export const IMAGE_FETCH_DATE_FAIL = "IMAGE_FETCH_DATE_FAIL";

export type ImageI = {
  date: string;
  explanation: string;
  hdurl: string;
  url: string;
  mediaType: string;
  serviceVersion: string;
  title: string;
  copyright: string;
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

export type ImageDispatchTypeI =
  | ImageFetchStreamLoading
  | ImageFetchStreamFail
  | ImageFetchStreamSuccess
  | ImageFetchShareSuccess
  | ImageFetchShareFail;
