import { Product } from "@/pages/api/products";
import { Asset, AssetFile } from "contentful";

export const discountedPrice = ({
  fields: { price, discountPercent },
}: Product): number => price - (price * (discountPercent ?? 0)) / 100;

export const getImageURLFromAsset = (asset?: Asset): string => {
  if (!asset?.fields?.file) {
    return "/images/placeholder.png";
  }
  const file = asset.fields.file as AssetFile;

  return `https:${file.url}`;
};

export const getFirstProductImageURL = ({
  fields: productFields,
}: Product): string => getImageURLFromAsset(productFields.gallery?.[0]);
