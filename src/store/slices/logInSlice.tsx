import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LogInState } from "@/props/props";

const initialState: LogInState = {
  isLogIn: false,
  currentAuthor: "",
};

export const logInSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: { author: string } }>) => {
      if (action.payload.user) {
        state.isLogIn = true;
        state.currentAuthor = action.payload.user.author;
        console.log(action.payload.user.author);
      }
    },
    logout: (state) => {
      state.isLogIn = false;
      state.currentAuthor = "";
    },
  },
});

export const { login, logout } = logInSlice.actions;

export default logInSlice.reducer;
