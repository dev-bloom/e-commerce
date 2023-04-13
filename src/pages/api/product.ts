import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/utils/contentfulClient";
import { Product } from "./products";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const products = await contentfulClient.getEntries({
    content_type: "product",
    "fields.slug": req.query.slug,
  });

  res.status(200).json(products.items[0].fields as unknown as Product);
}
