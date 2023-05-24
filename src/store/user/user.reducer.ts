import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "./user.types";

export const setUserReducer = (state: User, action: PayloadAction<User>) => {
  state = {...state, ...payload}
};

export const clearUserReducer = (state: User) => {
  state = { ...initialState }
};
