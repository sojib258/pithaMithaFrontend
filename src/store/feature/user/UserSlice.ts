import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_KEY;
interface UserData {
  id: number | null;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  phone: number | null;
  profileImg: {
    id: number | null;
    width: number | null;
    height: number | null;
    url: string;
  };
  loading: boolean;
  errorMsg: string;
}
const initialState: UserData = {
  id: null,
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: null,
  profileImg: {
    id: null,
    width: null,
    height: null,
    url: "",
  },
  loading: false,
  errorMsg: "",
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const token = Cookies.get("myAppAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${API_URL}/users/me?populate=image`, {
        headers,
      });
      return response?.data;
    } catch (error) {
      return `Error fetching userData ${error}`;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser: (state) => {
      console.log("clearUser called");
      state.id = initialState.id;
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.username = initialState.username;
      state.email = initialState.email;
      state.phone = initialState.phone;
      state.profileImg.id = initialState.profileImg.id;
      state.profileImg.width = initialState.profileImg.width;
      state.profileImg.height = initialState.profileImg.height;
      state.profileImg.url = initialState.profileImg.url;
      state.loading = initialState.loading;
      state.errorMsg = initialState.errorMsg;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(fetchUserData.fulfilled, (state, action: any) => {
        state.loading = false;
        state.id = action.payload.id;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload?.lastName;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.profileImg.id = action.payload?.image?.id;
        state.profileImg.width = action.payload?.image?.width;
        state.profileImg.height = action.payload?.image?.height;
        state.profileImg.url = action.payload?.image?.url;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.errorMsg = "Error from userSlice";
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
