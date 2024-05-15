import fetchData from "@/utils/api/fetchData";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
interface UserData {
  id: number | null;
  firstName: string;
  lastName: string;
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

export const fetchUserData: any = createAsyncThunk(
  "user/fetchUserData",
  async (userId) => {
    try {
      const token = Cookies.get("myAppAuthToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetchData(`users/me?populate=image`, headers);

      console.log("Response", response);
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
      state.id = null;
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.email = "";
      state.phone = null;
      state.profileImg.width = null;
      state.profileImg.height = null;
      state.profileImg.url = "";
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
        state.lastName = action.payload.lastName;
        state.username = action.payload.userName;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.profileImg.id = action.payload.image?.id;
        state.profileImg.width = action.payload.image?.width;
        state.profileImg.height = action.payload.image?.height;
        state.profileImg.url = action.payload.image?.url;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.errorMsg = "Error from userSlice";
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
