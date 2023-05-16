import { getMockProduct } from "@/utils/test.helpers";

import cart, { addItem, clearCart, removeItem, updateItemQuantity } from "./";

describe("cart.reducer.ts", () => {
  describe("addItemReducer", () => {
    it("should add the item to the cart", () => {
      const mockProduct = getMockProduct({ slug: "test-slug" });
      const mockState = {
        items: [],
      };
      const action = addItem({
        product: mockProduct,
        quantity: 1,
      });
      const result = cart(mockState, action);

      expect(result).toEqual({
        items: [
          {
            product: mockProduct,
            quantity: 1,
          },
        ],
      });
    });
    it("should update the quantity of the item if it already exists", () => {
      const mockProduct = getMockProduct({ slug: "test-slug" });
      const mockState = {
        items: [
          {
            product: mockProduct,
            quantity: 1,
          },
        ],
      };
      const action = addItem({
        product: mockProduct,
        quantity: 2,
      });
      const result = cart(mockState, action);

      expect(result).toEqual({
        items: [
          {
            product: mockProduct,
            quantity: 2,
          },
        ],
      });
    });
  });

  describe("removeItemReducer", () => {
    it("should remove the item from the cart", () => {
      const mockProduct = getMockProduct({ slug: "test-slug" });
      const mockState = {
        items: [
          {
            product: mockProduct,
            quantity: 1,
          },
        ],
      };
      const action = removeItem("test-slug");
      const result = cart(mockState, action);

      expect(result).toEqual({
        items: [],
      });
    });
  });

  describe("updateItemQuantityReducer", () => {
    it("should update the quantity of the item", () => {
      const mockProduct = getMockProduct({ slug: "test-slug" });
      const mockState = {
        items: [
          {
            product: mockProduct,
            quantity: 1,
          },
        ],
      };
      const action = updateItemQuantity({
        slug: "test-slug",
        quantity: 2,
      });
      const result = cart(mockState, action);

      expect(result).toEqual({
        items: [
          {
            product: mockProduct,
            quantity: 2,
          },
        ],
      });
    });
  });

  describe("clearCartReducer", () => {
    it("should clear the cart", () => {
      const mockProduct = getMockProduct({ slug: "test-slug" });
      const mockState = {
        items: [
          {
            product: mockProduct,
            quantity: 1,
          },
        ],
      };
      const action = clearCart();
      const result = cart(mockState, action);

      expect(result).toEqual({
        items: [],
      });
    });
  });
});
