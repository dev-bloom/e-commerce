import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/utils/contentfulClient";
import { Document } from "@contentful/rich-text-types";
import { Asset, BaseEntry } from "contentful";
import { getFirstProductGalleryImage } from "@/utils/api/helpers";

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
  relatedProducts?: ContentFulEntry<ProductFields>[];
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
  const products =
    await contentfulClient.withoutLinkResolution.getEntries<ProductSkeleton>({
      content_type: "product",
      limit: 20,
      skip: +(req.query.skip ?? 0),
    });

  const mappedProducts = await Promise.all(
    products.items.map(async (product) => ({
      ...product,
      fields: {
        ...product.fields,
        gallery: await getFirstProductGalleryImage(product),
      },
    }))
  );

  res.status(200).json(mappedProducts);
}
