import type { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "@/utils/api/product.helpers";
import { Product } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const page = req.query.page ? Number(req.query.page) : 1;
  const products = await getProducts({ page });

  res.status(200).json(products);
}
