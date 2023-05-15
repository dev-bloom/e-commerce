import { Product } from "@/types";
import { Asset, AssetFile } from "contentful";

/**
 * Parse a query string
 * @param query - The query string to parse
 * @returns {string | undefined} The parsed query string
 * @example
 * parseQuery(undefined) // undefined
 * parseQuery(["test", "query"]) // "test query"
 * parseQuery("test query") // "test query"
 **/
export const parseQuery = (
  query: string | string[] | undefined
): string | undefined => {
  if (!query) {
    return undefined;
  }
  if (Array.isArray(query)) {
    return query.join(" ");
  }

  return query;
};

/**
 * Check if a value is undefined
 * @param value - The value to check
 * @returns {boolean} Whether the value is undefined
 **/
export const isUndefined = (value: unknown): value is undefined =>
  typeof value === "undefined";

/**
 * Check if a value is undefined and return a default value if it is
 * @param value the value to check
 * @param defaultValue the default value to return if the value is undefined
 * @returns the value if it is not undefined, otherwise the default value
 **/
export const defaultValueIfUndefined = <T>(
  value: T | undefined,
  defaultValue: T
): T => (isUndefined(value) ? defaultValue : value);

/**
 * Calculate the discounted price of a product
 *
 * @param {Product} product - The product object
 * @returns {number} The discounted price of the product
 **/
export const discountedPrice = ({
  fields: { price, discountPercent },
}: Product): number => price - (price * (discountPercent ?? 0)) / 100;

/**
 * Get the image URL from an asset
 * @param asset - The asset to get the image URL from
 * @returns {string} The image URL
 * @example
 * getImageURLFromAsset(undefined) // "/images/placeholder.png"
 * getImageURLFromAsset({ fields: { file: undefined } }) // "/images/placeholder.png"
 * getImageURLFromAsset({ fields: { file: { url: "//test-image-url.jpg" } } }) // "https://test-image-url.jpg"
 **/
export const getImageURLFromAsset = (asset?: Asset): string => {
  if (!asset?.fields?.file) {
    return "/images/placeholder.png";
  }
  const file = asset.fields.file as AssetFile;

  return `https:${file.url}`;
};

/**
 * Get the first image URL from a product's gallery
 * @param product - The product to get the image URL from
 * @returns {string} The image URL
 * @example
 * getFirstProductImageURL({ fields: { gallery: [] } }) // "/images/placeholder.png"
 * getFirstProductImageURL({ fields: { gallery: [undefined] } }) // "/images/placeholder.png"
 * getFirstProductImageURL({ fields: { gallery: [{ fields: { file: undefined } }] } }) // "/images/placeholder.png"
 * getFirstProductImageURL({ fields: { gallery: [{ fields: { file: { url: "//test-image-url.jpg" } } }] } }) // "https://test-image-url.jpg"
 **/
export const getFirstProductImageURL = ({
  fields: productFields,
}: Product): string => getImageURLFromAsset(productFields.gallery?.[0]);
