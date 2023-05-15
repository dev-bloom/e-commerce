import { getMockProduct } from "@/utils/test.helpers";
import {
  addItem,
  clearCart,
  removeItem,
  updateItemQuantity,
} from "./cart.actions";

describe("cart.actions.ts", () => {
  describe("addItem", () => {
    it("should return an action with the given payload", () => {
      const mockProduct = getMockProduct({ slug: "test-slug" });
      const payload = {
        product: mockProduct,
        quantity: 1,
      };
      const action = addItem(payload);

      expect(action).toEqual({
        type: "cart/addItem",
        payload,
      });
    });
  });

  describe("removeItem", () => {
    it("should return an action with the given payload", () => {
      const payload = "test-slug";
      const action = removeItem(payload);

      expect(action).toEqual({
        type: "cart/removeItem",
        payload,
      });
    });
  });

  describe("updateItemQuantity", () => {
    it("should return an action with the given payload", () => {
      const payload = {
        slug: "test-slug",
        quantity: 1,
      };
      const action = updateItemQuantity(payload);

      expect(action).toEqual({
        type: "cart/updateItemQuantity",
        payload,
      });
    });
  });

  describe("clearCart", () => {
    it("should return an action with the given payload", () => {
      const action = clearCart();

      expect(action).toEqual({
        type: "cart/clearCart",
        payload: undefined,
      });
    });
  });
});
