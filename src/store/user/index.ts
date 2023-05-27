import { createSlice } from "@reduxjs/toolkit";

import type { User } from "../../types/user.types";

import { setUserReducer, clearUserReducer } from "./user.reducer";

export const initialState: User = {
  name: "",
  surname: "",
  email: "",
  address: "",
  phone: "",
  city: "",
  deparment: "",
  postalCode: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: setUserReducer,
    clearUser: clearUserReducer,
  },
});

export * from "./user.actions";
export * from "./user.selectors";
export default userSlice.reducer;
