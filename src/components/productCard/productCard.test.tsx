import { render, screen } from "@testing-library/react";
import RelatedCard from "./productCard";
import { getMockProduct } from "@/utils/test.helpers";

const mockProduct = getMockProduct({
  discountPercent: 10,
  price: 100,
  name: "Test Product",
  slug: "test-product",
  tags: ["tag1", "tag2"],
});

describe("RelatedCard", () => {
  it("renders product name, price and discount", () => {
    render(<RelatedCard card={mockProduct} />);
    const nameElement = screen.getByText(mockProduct.fields.name);
    const priceElement = screen.getByText(`$${90}`);
    const discountElement = screen.getByText("10% OFF");

    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(discountElement).toBeInTheDocument();
  });

  it("does not render discount if it's not present", () => {
    const product = { ...mockProduct };
    delete product.fields.discountPercent;
    render(<RelatedCard card={product} />);
    const discountElement = screen.queryByText(/% OFF/);
    expect(discountElement).toBeNull();
  });

  it("renders tags", () => {
    render(<RelatedCard card={mockProduct} />);
    const tagElements = screen.getAllByRole("tag");
    expect(tagElements.length).toBeGreaterThan(0);
  });
});
