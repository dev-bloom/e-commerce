import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../../types/user.types";

import { initialState } from ".";

export const clearUserReducer = (state: User) => {
  state = { ...initialState };
  return state;
};

export const setUserReducer = (state: User, action: PayloadAction<User>) => {
  state = { ...state, ...action.payload };
  return state;
};
