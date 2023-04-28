import type { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "@/utils/api/product.helpers";
import { Product } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const skip = +(req.query.skip ?? 0);
  const products = await getProducts(skip);

  res.status(200).json(products);
}
