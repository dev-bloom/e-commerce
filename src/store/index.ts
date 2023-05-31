import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import cart from "./cart";
import storage from "./storage";
import user from "./user";

export const rootReducer = combineReducers({
  cart,
  user,
});

const reducer: typeof rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  timeout: 100,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
