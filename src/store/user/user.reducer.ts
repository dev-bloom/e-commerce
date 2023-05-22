import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "./user.types";

export const setUserReducer = (state: User, action: PayloadAction<User>) => {
  state.name = action.payload.name;
  state.email = action.payload.email;
  state.surname = action.payload.surname;
  state.address = action.payload.address;
  state.phone = action.payload.phone;
  state.city = action.payload.city;
  state.deparment = action.payload.deparment;
  state.postalCode = action.payload.postalCode;
};

export const clearUserReducer = (state: User) => {
  state.name = "";
  state.email = "";
  state.surname = "";
  state.address = "";
  state.phone = "";
  state.city = "";
  state.deparment = "";
  state.postalCode = "";
};
