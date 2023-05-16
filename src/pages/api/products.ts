import type { NextApiRequest, NextApiResponse } from "next";

import { Product } from "@/types";
import { getProducts } from "@/utils/api/product.helpers";
import { parseQuery } from "@/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const page = parseQuery(req.query.page);
  const products = await getProducts({ page });

  res.status(200).json(products);
}
