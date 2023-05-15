import { RootState } from "@/store";
import { discountedPrice } from "@/utils/helpers";

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
