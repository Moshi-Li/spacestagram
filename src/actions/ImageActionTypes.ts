export const IMAGE_FETCH_LOADING = "IMAGE_FETCH_LOADING";
export const IMAGE_FETCH_SUCCESS = "IMAGE_FETCH_SUCCESS";
export const IMAGE_FETCH_FAIL = "IMAGE_FETCH_FAIL";

export type ImageI = {
  date: string;
  explanation: string;
  hdurl: string;
  url: string;
  mediaType: string;
  serviceVersion: string;
  title: string;
};

interface ImageFetchLoading {
  type: typeof IMAGE_FETCH_LOADING;
}

interface ImageFetchSuccess {
  type: typeof IMAGE_FETCH_SUCCESS;
  payload: ImageI[];
}

interface ImageFetchFail {
  type: typeof IMAGE_FETCH_FAIL;
}

export type ImageDispatchTypeI =
  | ImageFetchLoading
  | ImageFetchFail
  | ImageFetchSuccess;
