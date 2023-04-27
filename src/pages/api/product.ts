import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "./products";
import { getProduct } from "@/utils/api/product.helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const product = await getProduct(req.query.slug as string);

  res.status(200).json(product);
}
