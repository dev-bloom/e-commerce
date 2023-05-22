import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user.types";
import { setUserReducer, clearUserReducer } from "./user.reducer";

const initialState: User = {
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
export * from "./user.types";
export default userSlice.reducer;
