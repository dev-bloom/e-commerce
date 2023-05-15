import { getMockProduct } from "@/utils/test.helpers";
import { selectCartItems, selectTotalProducts } from "./cart.selectors";

describe("cart.selectors.ts", () => {
  describe("selectCartItems", () => {
    it("should return the cart items", () => {
      const mockState = {
        cart: {
          items: [
            {
              product: getMockProduct({ slug: "test-slug" }),
              quantity: 1,
            },
          ],
        },
      };
      const result = selectCartItems(mockState);

      expect(result).toEqual(mockState.cart.items);
    });
  });
  describe("selectTotalProducts", () => {
    it("should return the total number of products in the cart", () => {
      const mockState = {
        cart: {
          items: [
            {
              product: getMockProduct({ slug: "test-slug" }),
              quantity: 1,
            },
            {
              product: getMockProduct({ slug: "test-slug-2" }),
              quantity: 2,
            },
          ],
        },
      };
      const result = selectTotalProducts(mockState);

      expect(result).toEqual(3);
    });
  });
  describe("selectTotalPrice", () => {
    it("should return the total price of all products in the cart", () => {
      const mockState = {
        cart: {
          items: [
            {
              product: getMockProduct({ slug: "test-slug" }),
              quantity: 1,
            },
            {
              product: getMockProduct({ slug: "test-slug-2" }),
              quantity: 2,
            },
          ],
        },
      };
      const result = selectTotalProducts(mockState);

      expect(result).toEqual(3);
    });
  });
  describe("selectProductCountForSlug", () => {
    it("should return the quantity of the product in the cart", () => {
      const mockState = {
        cart: {
          items: [
            {
              product: getMockProduct({ slug: "test-slug" }),
              quantity: 1,
            },
            {
              product: getMockProduct({ slug: "test-slug-2" }),
              quantity: 2,
            },
          ],
        },
      };
      const result = selectTotalProducts(mockState);

      expect(result).toEqual(3);
    });
  });
  describe("selectIsProductInCart", () => {
    it("should return true if the product is in the cart", () => {
      const mockState = {
        cart: {
          items: [
            {
              product: getMockProduct({ slug: "test-slug" }),
              quantity: 1,
            },
            {
              product: getMockProduct({ slug: "test-slug-2" }),
              quantity: 2,
            },
          ],
        },
      };
      const result = selectTotalProducts(mockState);

      expect(result).toEqual(3);
    });
  });
});
