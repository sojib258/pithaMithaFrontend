import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;

interface Format {
  width: number;
  height: number;
  url: number;
}

interface Image {
  id: number;
  width: number;
  height: number;
  url: string;
  alternativeText: string;
  formats: Format;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  image: Image;
}

interface InitialState {
  items: Category[];
  errorMsg: string;
  loading: boolean;
}

const initialState: InitialState = {
  items: [],
  errorMsg: "",
  loading: false,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/categories?populate=image`);
      return response.data.data;
    } catch (error) {
      return `Error fetching Categories ${error}`;
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((item: any) => ({
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
          image: {
            id: item.attributes.image.data.id,
            wdith: item.attributes.image.data.attributes.width,
            height: item.attributes.image.data.attributes.height,
            url: item.attributes.image.data.attributes.url,
            alternativeText:
              item.attributes.image.data.attributes.alternativeText,
            formats: Object.keys(
              item.attributes.image.data.attributes.formats
            ).reduce((acc: Record<string, Format>, cur: string) => {
              acc[cur] = {
                width: item.attributes.image.data.attributes.formats[cur].width,
                height:
                  item.attributes.image.data.attributes.formats[cur].height,
                url: item.attributes.image.data.attributes.formats[cur].url,
              };
              return acc;
            }, {}),
          },
        }));
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload as string;
      });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
