import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isAuthenticated = true;
      state.userId = action.payload.user.id;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
