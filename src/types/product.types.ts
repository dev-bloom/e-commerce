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

export type FeaturedProductsFields = {
  productList: ContentFulEntry<ProductFields>[];
  title: string;
};

export type FeaturedProductsSkeleton = {
  fields: FeaturedProductsFields;
  contentTypeId: "trendingProducts";
};

export type FeaturedProducts = ContentFulEntry<FeaturedProductsFields>;
