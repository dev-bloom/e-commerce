import type { PayloadAction } from "@reduxjs/toolkit";

import type { CartItem, CartState } from "./cart.types";

export const addItemReducer = (
  state: CartState,
  action: PayloadAction<CartItem>
) => {
  const itemIndex = state.items.findIndex(
    (item) => item.product.fields.slug === action.payload.product.fields.slug
  );

  if (itemIndex !== -1) {
    state.items[+itemIndex].quantity = action.payload.quantity;
  } else {
    state.items.push(action.payload);
  }
};

export const removeItemReducer = (
  state: CartState,
  action: PayloadAction<string>
) => {
  state.items = state.items.filter(
    (item) => item.product.fields.slug !== action.payload
  );
};

export const updateItemQuantityReducer = (
  state: CartState,
  action: PayloadAction<{ slug: string; quantity: number }>
) => {
  const itemIndex = state.items.findIndex(
    (item) => item.product.fields.slug === action.payload.slug
  );

  if (itemIndex !== -1) {
    state.items[+itemIndex].quantity = action.payload.quantity;
  }
};

export const clearCartReducer = (state: CartState) => {
  state.items = [];
};
