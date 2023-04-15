// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import cartReducer from "./cart";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;
