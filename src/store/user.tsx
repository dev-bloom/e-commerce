import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";
import { RootState } from ".";

const initialState: User = {
  name: "",
  surname: "",
  email: "",
  address: "",
  phone: "",
  city: "",
  deparment: "",
  country: "",
  postalCode: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.surname = action.payload.surname;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.city = action.payload.city;
      state.deparment = action.payload.deparment;
      state.country = action.payload.country;
      state.postalCode = action.payload.postalCode;
    },

    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.surname = "";
      state.address = "";
      state.phone = "";
      state.city = "";
      state.deparment = "";
      state.country = "";
      state.postalCode = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

// SELECTORS

export const selectUsers = (state: RootState) => {
  return state.user;
};
