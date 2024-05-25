import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_KEY;

type Data = {
  id: number;
  name: string;
};

type InitialState = {
  items: Data[];
  loading: boolean;
  errorMsg: string;
};

const initialState: InitialState = {
  items: [],
  loading: false,
  errorMsg: "",
};

export const fetchTags = createAsyncThunk("tags/fetchItems", async () => {
  try {
    const token = Cookies.get("myAppAuthToken");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${API_URL}/tags`, { headers });

    return response?.data.data;
  } catch (error: any) {
    console.error("Error from tagsSlice", error);
    return error?.message;
  }
});

const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state, action) => {
        (state.loading = true), (state.errorMsg = "");
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        (state.loading = false),
          (state.items = action.payload.map((item: any) => ({
            id: item.id,
            name: item.attributes.name,
          })));
      })
      .addCase(fetchTags.rejected, (state, action) => {
        (state.loading = false), (state.errorMsg = "Error from tagsSlice");
      });
  },
});

export const {} = tagSlice.actions;
export default tagSlice.reducer;
