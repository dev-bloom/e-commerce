import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { discountedPrice } from "@/utils/helpers";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) =>
          item.product.fields.slug === action.payload.product.fields.slug
      );

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.fields.slug !== action.payload
      );
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ slug: string; quantity: number }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product.fields.slug === action.payload.slug
      );

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalProducts = (state: RootState) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const selectTotalPrice = (state: RootState) => {
  return state.cart.items.reduce(
    (total, item) =>
      total + discountedPrice(item.product) * (item.quantity || 0),
    0
  );
};

export const selectProductCountForSlug =
  (slug: string) => (state: RootState) => {
    const item = state.cart.items.find(
      (item) => item.product.fields.slug === slug
    );

    return item?.quantity || 0;
  };

export const selectIsProductInCart = (slug: string) => (state: RootState) => {
  return state.cart.items.some((item) => item.product.fields.slug === slug);
};
