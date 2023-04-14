import type { NextApiRequest, NextApiResponse } from "next";
import contentfulClient from "@/utils/contentfulClient";

type ContentfulImage = {
  fields: {
    description: string;
    url: string;
    file: {
      contentType: string;
      fileName: string;
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
};

type ContentfulRichText = {
  content: {
    value: string;
    nodeType: string;
  }[];
};

export type Product = {
  name: string;
  shortDescription: string;
  longDescription: ContentfulRichText;
  price: number;
  tags: string[];
  stock: number;
  slug: string;
  allowBackorder?: boolean;
  discountPercent?: number;
  gallery?: ContentfulImage[];
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
