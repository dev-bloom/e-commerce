import { getMockProduct } from "@/utils/test.helpers";
import {
  selectCartItems,
  selectIsProductInCart,
  selectProductCountForSlug,
  selectTotalPrice,
  selectTotalProducts,
} from "./cart.selectors";

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
      const [mockProduct1, mockProduct2] = [
        getMockProduct({ slug: "test-slug", price: 5 }),
        getMockProduct({ slug: "test-slug-2", price: 11 }),
      ];
      const mockState = {
        cart: {
          items: [
            {
              product: mockProduct1,
              quantity: 1,
            },
            {
              product: mockProduct2,
              quantity: 2,
            },
          ],
        },
      };
      const result = selectTotalPrice(mockState);
      const totalPrice = 5 + 11 + 11;
      const discount = 0.1;

      expect(result).toEqual(totalPrice * (1 - discount));
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
      const result = selectProductCountForSlug("test-slug-2")(mockState);

      expect(result).toEqual(2);
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
      const result = selectIsProductInCart("test-slug-2")(mockState);

      expect(result).toBeTruthy();
    });
  });
});
