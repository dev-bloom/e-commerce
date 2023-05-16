import type { NextApiRequest, NextApiResponse } from "next";

import { FeaturedProducts } from "@/types";
import { getFeaturedProducts } from "@/utils/api/product.helpers";

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeaturedProducts | ErrorResponse>
) {
  const featuredProducts = await getFeaturedProducts();

  if (!featuredProducts) {
    return res.status(404).json({ message: "Featured Products not found" });
  }

  res.status(200).json(featuredProducts);
}
