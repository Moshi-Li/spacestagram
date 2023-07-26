import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import Axios from "axios";

import { RootState } from "../store";
import { getAccessToken } from "../graphQL/utility";
import { getCommentByDateQuery, insertOneComment } from "../graphQL/comments";
import { ImageDetail, ImageComment, ModalStatus } from "./interface";

const defaultValue: {
  isOpen: boolean;
  targetImage: string;
  modalStatus: ModalStatus;
  imageDetail?: ImageDetail;
} = {
  isOpen: false,
  targetImage: "",
  modalStatus: ModalStatus.Idle,
};

export const setTargetImage = createAsyncThunk<
  ImageDetail,
  { targetImage: string; imageDetail?: ImageDetail },
  { state: RootState }
>("modalSlice/setTargetImage", async (params) => {
  const { targetImage, imageDetail } = params;
  if (imageDetail) return imageDetail;

  const { data } = await Axios.get<ImageDetail>(
    "https://li-moshi.com/v1/apod",
    {
      params: {
        ...{
          date: targetImage,
        },
      },
    }
  );
  const imageInfo = camelcaseKeys(data);

  const imageDate = new Date(targetImage).toISOString();

  const db_token = await getAccessToken();

  const {
    data: {
      data: { comments },
    },
  } = await Axios.post<{
    data: { comments: ImageComment[] };
  }>(
    "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-kopsx/graphql",
    {
      query: getCommentByDateQuery,
      variables: {
        date: imageDate,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${db_token as string}`,
      },
    }
  );
  imageInfo.comments = comments;
  return imageInfo;
});

export const insertComment = createAsyncThunk<
  ImageComment,
  { imageDate: string; text: string },
  { state: RootState }
>("modalSlice/insertOneComment", async (params) => {
  const db_token = await getAccessToken();
  const image_date = new Date(params.imageDate).toISOString();
  const text = params.text;
  const date = new Date().toISOString();

  const { data } = await Axios.post<{
    data: { insertOneComment: ImageComment };
  }>(
    "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-kopsx/graphql",
    {
      query: insertOneComment,
      variables: {
        image_date,
        date,
        text,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${db_token as string}`,
      },
    }
  );
  const addedComment = camelcaseKeys(data.data.insertOneComment);
  return addedComment;
});

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: defaultValue,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    resetModal: (state) => {
      const { isOpen, targetImage, modalStatus } = defaultValue;
      state.isOpen = isOpen;
      state.modalStatus = modalStatus;
      state.targetImage = targetImage;
      state.imageDetail = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTargetImage.pending, (state) => {
      state.modalStatus = ModalStatus.Loading;
    });
    builder.addCase(setTargetImage.fulfilled, (state, action) => {
      state.imageDetail = action.payload;
      state.modalStatus = ModalStatus.Ready;
    });
    builder.addCase(setTargetImage.rejected, (state) => {
      state.modalStatus = ModalStatus.Error;
    });
    builder.addCase(insertComment.fulfilled, (state, action) => {
      state.imageDetail?.comments.push(action.payload);
    });
  },
});

export const modalReducer = modalSlice.reducer;
export const { setModalOpen, resetModal } = modalSlice.actions;
