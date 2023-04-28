import { Asset } from "contentful";
import { ContentFulEntry } from "./global.types";
import { Document } from "@contentful/rich-text-types";

export type ProductFields = {
  name: string;
  shortDescription: string;
  longDescription: Document;
  price: number;
  tags: string[];
  stock: number;
  slug: string;
  allowBackorder?: boolean;
  discountPercent?: number;
  gallery?: Asset[];
  relatedProducts?: ContentFulEntry<ProductFields>[];
};

export type ProductSkeleton = {
  fields: ProductFields;
  contentTypeId: "product";
};

export type Product = ContentFulEntry<ProductFields>;
