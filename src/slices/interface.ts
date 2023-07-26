export interface ImageDetail {
  copyright: string;
  date: string;
  explanation: string;
  mediaType: string;
  title: string;
  hdurl: string;
  url: string;
  comments: ImageComment[];
}

export interface ImageComment {
  imageDate: string;
  date: string;
  text: string;
}

export enum HomeStatus {
  Loading,
  Ready,
  Idle,
  Error,
  Adding,
}

export enum ExploreStatus {
  Loading,
  Ready,
  Idle,
  Error,
  Adding,
}

export enum ModalStatus {
  Loading,
  Ready,
  Idle,
  Error,
}
