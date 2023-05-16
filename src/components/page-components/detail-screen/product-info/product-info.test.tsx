import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import { Product } from "@/types";
import { getMockProduct } from "@/utils/test.helpers";

import ProductInfo from "./product-info";

describe("ProductInfo", () => {
  let mockProduct: Product;
  const onAddToCartMock = jest.fn();
  const onRemoveFromCartMock = jest.fn();
  beforeAll(() => {
    mockProduct = getMockProduct({
      discountPercent: 10,
      price: 100,
      name: "Test Product",
      slug: "test-product",
      tags: ["tag1", "tag2"],
    });
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
  });
  it("renders product name, price and discount", () => {
    render(
      <ProductInfo
        product={mockProduct}
        productCount={1}
        isProductInCart
        onAddToCart={onAddToCartMock}
        onRemoveFromCart={onRemoveFromCartMock}
      />
    );
    const nameElement = screen.getByText(mockProduct.fields.name);
    const priceElement = screen.getByText(`$ ${mockProduct.fields.price}`);
    const discountElement = screen.getByText(
      `${mockProduct.fields.discountPercent}% OFF`
    );
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(discountElement).toBeInTheDocument();
  });

  it("calls onAddToCart with quantity when add to cart button is clicked", () => {
    const onAddToCartMock = jest.fn();
    const { getByTestId } = render(
      <ProductInfo
        product={mockProduct}
        productCount={0}
        isProductInCart={false}
        onAddToCart={onAddToCartMock}
        onRemoveFromCart={() => {}}
      />
    );

    const addButton = getByTestId("add-to-cart-btn");
    fireEvent.click(addButton);

    expect(onAddToCartMock).toHaveBeenCalledWith(1);
  });
});
