import type { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/types";
import { getProduct } from "@/utils/api/product.helpers";

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | ErrorResponse>
) {
  const product = await getProduct(req.query.slug as string);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
}
