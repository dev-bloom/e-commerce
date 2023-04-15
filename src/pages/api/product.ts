import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/utils/contentfulClient";
import { Product, ProductSkeleton } from "./products";
import { Asset, EntriesQueries } from "contentful";
import { getProductGallery, getRelatedProducts } from "@/utils/api/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  const products =
    await contentfulClient.withoutLinkResolution.getEntries<ProductSkeleton>({
      content_type: "product",
      "fields.slug": req.query.slug,
      limit: 1,
    } as EntriesQueries<ProductSkeleton, undefined>);
  const product: Product = products.items[0];

  const [relatedProducts, productGallery] = await Promise.all([
    getRelatedProducts(product),
    getProductGallery(product),
  ]);

  res.status(200).json({
    ...product,
    fields: {
      ...product.fields,
      relatedProducts,
      gallery: productGallery,
    },
  });
}
