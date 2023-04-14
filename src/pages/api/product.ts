import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/utils/contentfulClient";
import { Product, ProductSkeleton } from "./products";
import { EntriesQueries } from "contentful";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const products = await contentfulClient.getEntries<ProductSkeleton>({
    content_type: "product",
    "fields.slug": req.query.slug,
    include: 1,
  } as EntriesQueries<ProductSkeleton, undefined>);

  res.status(200).json(products.items[0]);
}
