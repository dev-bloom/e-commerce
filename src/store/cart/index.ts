import { createSlice } from "@reduxjs/toolkit";

import {
  addItemReducer,
  clearCartReducer,
  removeItemReducer,
  updateItemQuantityReducer,
} from "./cart.reducer";
import { CartState } from "./cart.types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: addItemReducer,
    removeItem: removeItemReducer,
    updateItemQuantity: updateItemQuantityReducer,
    clearCart: clearCartReducer,
  },
});

export * from "./cart.actions";
export * from "./cart.selectors";
export * from "./cart.types";
export default cartSlice.reducer;
