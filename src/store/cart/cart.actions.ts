import { createAction } from "@reduxjs/toolkit";

import type { CartItem } from "./cart.types";

export const addItem = createAction<CartItem>("cart/addItem");
export const removeItem = createAction<string>("cart/removeItem");
export const updateItemQuantity = createAction<{
  slug: string;
  quantity: number;
}>("cart/updateItemQuantity");
export const clearCart = createAction("cart/clearCart");
