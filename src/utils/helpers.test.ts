import { Product } from "@/types";

import {
  defaultValueIfUndefined,
  discountedPrice,
  getFirstProductImageURL,
  getImageURLFromAsset,
  isUndefined,
  parseQuery,
} from "./helpers";
import { getMockAssetImage, getMockProduct } from "./test.helpers";

describe("parseQuery", () => {
  it("returns undefined when the query is undefined", () => {
    const result = parseQuery(undefined);
    expect(result).toBe(undefined);
  });

  it("returns the query when the query is a string", () => {
    const query = "test query";
    const result = parseQuery(query);
    expect(result).toBe(query);
  });

  it("returns the query when the query is an array", () => {
    const query = ["test", "query"];
    const result = parseQuery(query);
    expect(result).toBe("test query");
  });
});

describe("isUndefined", () => {
  it("returns true when the value is undefined", () => {
    const result = isUndefined(undefined);
    expect(result).toBe(true);
  });

  it("returns false when the value is not undefined", () => {
    const result = isUndefined("test");
    expect(result).toBe(false);
  });

  it("returns false when the value is null", () => {
    const result = isUndefined(null);
    expect(result).toBe(false);
  });

  it("returns false when the value is an empty string", () => {
    const result = isUndefined("");
    expect(result).toBe(false);
  });

  it("returns false when the value is zero", () => {
    const result = isUndefined(0);
    expect(result).toBe(false);
  });

  it("returns false when the value is NaN", () => {
    const result = isUndefined(NaN);
    expect(result).toBe(false);
  });

  it("returns false when the value is false", () => {
    const result = isUndefined(false);
    expect(result).toBe(false);
  });
});

describe("defaultValueIfUndefined", () => {
  it("returns the default value when the value is undefined", () => {
    const defaultValue = "default";
    const result = defaultValueIfUndefined(undefined, defaultValue);
    expect(result).toBe(defaultValue);
  });

  it("returns the provided value when it is not undefined", () => {
    const value = "test";
    const defaultValue = "default";
    const result = defaultValueIfUndefined(value, defaultValue);
    expect(result).toBe(value);
  });
});

describe("discountedPrice", () => {
  it("returns the correct discounted price when discount is provided", () => {
    const product: Product = getMockProduct({
      price: 200,
      discountPercent: 10,
    });
    const result = discountedPrice(product);
    expect(result).toBe(180);
  });

  it("returns the original price when discount is 0", () => {
    const product = getMockProduct({
      price: 200,
      discountPercent: 0,
    });
    const result = discountedPrice(product);
    expect(result).toBe(200);
  });
});

describe("getImageURLFromAsset", () => {
  it("returns the placeholder image url when no asset is provided", () => {
    const result = getImageURLFromAsset(undefined);
    expect(result).toBe("/images/placeholder.png");
  });

  it("returns the placeholder image url when asset fields file is not provided", () => {
    const asset = getMockAssetImage();
    delete asset.fields.file;
    const result = getImageURLFromAsset(asset);
    expect(result).toBe("/images/placeholder.png");
  });

  it("returns the correct image url when asset is provided", () => {
    const asset = getMockAssetImage("//test-image-url.jpg");
    const result = getImageURLFromAsset(asset);
    expect(result).toBe("https://test-image-url.jpg");
  });
});

describe("getFirstProductImageURL", () => {
  it("returns the placeholder image url when no gallery images are provided", () => {
    const product = getMockProduct({
      gallery: [],
    });
    const result = getFirstProductImageURL(product);
    expect(result).toBe("/images/placeholder.png");
  });

  it("returns the correct image url when a product with gallery images is provided", () => {
    const image = getMockAssetImage("//test-image-url.jpg");
    const product = getMockProduct({
      gallery: [image],
    });
    const result = getFirstProductImageURL(product);
    expect(result).toBe("https://test-image-url.jpg");
  });
});
