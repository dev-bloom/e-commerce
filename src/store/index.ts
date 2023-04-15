// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import cartReducer from "./cart";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;
