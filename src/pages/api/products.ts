import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/utils/contentfulClient";
import { Document } from "@contentful/rich-text-types";
import { Asset, BaseEntry } from "contentful";

interface ContentFulEntry<T> extends BaseEntry {
  fields: T;
}

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
  relatedProducts?: ContentFulEntry<{
    fields: ProductFields;
    contentTypeId: "product";
  }>[];
};

export type ProductSkeleton = {
  fields: ProductFields;
  contentTypeId: "product";
};

export type Product = ContentFulEntry<ProductFields>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: "product",
    include: 1,
  });

  res.status(200).json(products.items);
}
