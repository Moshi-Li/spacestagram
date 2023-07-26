import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import camelcaseKeys from "camelcase-keys";
import Axios from "axios";

import { RootState } from "../store";
import { ImageDetail, ImageComment, HomeStatus } from "./interface";
import { getAccessToken } from "../graphQL/utility";
import {
  getCommentsByDateRangeQuery,
  getCommentByDateQuery,
  insertOneComment,
} from "../graphQL/comments";

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

const defaultValue: {
  images: ImageDetail[];
  status: HomeStatus;
  nextEndDate: number;
} = {
  images: [],
  status: HomeStatus.Idle,
  nextEndDate: new Date(new Date().toISOString().split("T")[0]).getTime(),
};

export const fetchHomeContent = createAsyncThunk<
  ImageDetail[],
  void,
  { state: RootState }
>("homeSlice/fetchContent", async (_, thunkApi) => {
  try {
    //Fetch image info from NASA
    const { nextEndDate } = thunkApi.getState().homeReducer;

    const start_date = new Date(
      nextEndDate - ONE_DAY_IN_MILLISECONDS * 3
    ).toISOString();

    const end_date = new Date(nextEndDate).toISOString();
    //"https://api.nasa.gov/planetary/apod"
    const response = await Axios.get<ImageDetail[]>(
      "https://li-moshi.com/v1/apod",
      {
        params: {
          ...{
            start_date: start_date.split("T")[0],
            end_date: end_date.split("T")[0],
          },
        },
      }
    );

    const imageDetails = camelcaseKeys(response.data);
    imageDetails.reverse();

    //Fetch Comments
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
        query: getCommentsByDateRangeQuery,
        variables: {
          start_date,
          end_date,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${db_token as string}`,
        },
      }
    );

    const imageComments = camelcaseKeys(comments);

    imageDetails.forEach((item) => {
      item.comments = imageComments.filter((comment) => {
        return comment.imageDate.split("T")[0] === item.date;
      });
    });

    return imageDetails;
  } catch (e) {
    console.log(e);
    return [];
  }
});

export const fetchMoreHomeContent = createAsyncThunk<
  ImageDetail[],
  void,
  { state: RootState }
>("homeSlice/fetchMoreContent", async (_, thunkApi) => {
  try {
    const { nextEndDate } = thunkApi.getState().homeReducer;

    const start_date = new Date(
      nextEndDate - ONE_DAY_IN_MILLISECONDS * 3
    ).toISOString();

    const end_date = new Date(nextEndDate).toISOString();

    const response = await Axios.get<ImageDetail[]>(
      "https://li-moshi.com/v1/apod",
      {
        params: {
          ...{
            start_date: start_date.split("T")[0],
            end_date: end_date.split("T")[0],
          },
        },
      }
    );

    const imageDetails = camelcaseKeys(response.data);
    imageDetails.reverse();

    //Fetch Comments
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
        query: getCommentsByDateRangeQuery,
        variables: {
          start_date,
          end_date,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${db_token as string}`,
        },
      }
    );

    const imageComments = camelcaseKeys(comments);

    imageDetails.forEach((item) => {
      item.comments = imageComments.filter((comment) => {
        return comment.imageDate.split("T")[0] === item.date;
      });
    });

    return imageDetails;
  } catch (e) {
    return [];
  }
});

export const insertComment = createAsyncThunk<
  ImageComment,
  { imageDate: string; text: string },
  { state: RootState }
>("homeSlice/insertComment", async (params) => {
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

export const updateComment = createAsyncThunk<
  {
    comments: ImageComment[];
    date: string;
  },
  { imageDate: string },
  { state: RootState }
>("homeSlice/updateComment", async (params) => {
  const db_token = await getAccessToken();
  const date = new Date(params.imageDate).toISOString();

  const { data } = await Axios.post<{
    data: { comments: ImageComment[] };
  }>(
    "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-kopsx/graphql",
    {
      query: getCommentByDateQuery,
      variables: {
        date,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${db_token as string}`,
      },
    }
  );

  const addedComment = camelcaseKeys(data.data.comments);
  addedComment.reverse();
  return {
    comments: addedComment,
    date: params.imageDate,
  };
});

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: defaultValue,
  reducers: {
    reset: (state) => {
      state.images = defaultValue.images;
      state.nextEndDate = defaultValue.nextEndDate;
      state.status = defaultValue.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeContent.pending, (state) => {
      state.status = HomeStatus.Loading;
    });
    builder.addCase(fetchHomeContent.fulfilled, (state, action) => {
      // Add user to the state array

      state.status = HomeStatus.Ready;
      state.images = [...state.images, ...action.payload];
      state.nextEndDate = state.nextEndDate - 4 * ONE_DAY_IN_MILLISECONDS;
    });
    builder.addCase(fetchHomeContent.rejected, (state) => {
      state.status = HomeStatus.Error;
    });

    builder.addCase(fetchMoreHomeContent.pending, (state) => {
      state.status = HomeStatus.Adding;
    });
    builder.addCase(fetchMoreHomeContent.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = HomeStatus.Ready;
      state.images = [...state.images, ...action.payload];
      state.nextEndDate = state.nextEndDate - 4 * ONE_DAY_IN_MILLISECONDS;
    });
    builder.addCase(fetchMoreHomeContent.rejected, (state) => {
      state.status = HomeStatus.Error;
    });

    builder.addCase(insertComment.fulfilled, (state, action) => {
      for (let i = 0; i < state.images.length; i++) {
        if (state.images[i].date === action.payload.imageDate.split("T")[0]) {
          state.images[i].comments.unshift(action.payload);
        }
      }
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.images.forEach((item) => {
        if (item.date === action.payload.date) {
          item.comments = action.payload.comments;
        }
      });
    });
  },
});

export const homeReducer = homeSlice.reducer;
export const { reset } = homeSlice.actions;
