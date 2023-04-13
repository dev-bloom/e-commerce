import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/utils/contentfulClient";

export type Product = {
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  tags: string[];
  stock: number;
  slug: string;
  allowBackorder?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products = await contentfulClient.getEntries({
    content_type: "product",
  });

  res
    .status(200)
    .json(products.items.map(({ fields }) => fields) as unknown as Product[]);
}
